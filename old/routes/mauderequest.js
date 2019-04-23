
const express = require('express')
const router = express.Router()
const maudeAssist = require('../helpers/MaudeAssist')
const stringTreatment = require('../helpers/StringTreatment')
const modelTree = require('../models/Tree')



// Config routes
    router.post('/intialmetared', (req, res) => {
        var parseResult = maudeAssist.requestMaudeParseMetaRed(req.body.config)
        res.cookie('inputInitial', req.body.config)
        new Promise((resolve, reject) => {
            // if(parseResult.stderr || /\[Config\]:/ig.test(parseResult)){
            if(/\[Config\]:/ig.test(parseResult)){
                if(parseResult.stderr){
                    reject(parseResult.stderr)
                }else{reject('Invalid Configuration')}
            }else{resolve()}
        }).then(() => {
            var rawResult = maudeAssist.requestMaudeMetaRed(req.body.config)
            var initConfig = stringTreatment.MaudeResult(rawResult)
            var tree = []
            var clickable_procs = stringTreatment.getClickable_procs(initConfig)
            var constraints = stringTreatment.getConstraints(initConfig)
            var newBranch = modelTree.branchFactory(initConfig, 'x', clickable_procs, constraints, '0')
            tree.push(newBranch)
            res.cookie("tree", tree)
            res.cookie("init_config", initConfig)
            res.cookie("current_branch", newBranch)
            req.flash('success_msg', 'New configuration started')
            res.redirect('/process')
        })
        .catch(err => {
            req.flash('error_msg', err)
            res.redirect('/')
        })
    })

    router.get('/metaApp/:process/:id', (req, res) => {
        var tree = req.cookies['tree']
        var current_branch =  modelTree.seachInTree(tree, req.params.id)
        console.log()
        new Promise((resolve, reject) => {
            var rawResult = maudeAssist.requestMaudeMetaApp(current_branch.name, req.params.process)
            if(/result Config: error/ig.test(rawResult)){
                reject('This operation cannot be executed')
            }else{resolve(rawResult)}
        }).then(rawResult => {
            var config = stringTreatment.MaudeResult(rawResult)
            var clickable_procs = stringTreatment.getClickable_procs(config)
            var constraints = stringTreatment.getConstraints(config)
            var newBranch = modelTree.branchFactory(config, current_branch.id, clickable_procs, constraints)
            var status = modelTree.addInTree(tree, newBranch)
            if (status == 'OAE'){
                req.flash('warning_msg', 'This operation already be executed')
            }else{
                res.cookie("current_branch", newBranch)
                res.cookie("tree", tree)
                req.flash('success_msg', 'The command was executed successfully')
            }
            res.redirect('/process')
        })
        .catch(err => {
            req.flash('error_msg', err)
            res.redirect('/process')
        })
       
    })
    router.post('/changeBranch', (req, res) => {
        var tree = req.cookies['tree']
        var branch = modelTree.seachInTree(tree, req.body.id)
        res.cookie("current_branch", branch)

        res.cookie("clickable_procs", stringTreatment.getClickable_procs(branch.name))
        res.cookie('constraints', stringTreatment.getConstraints(branch.name))
        req.flash('success_msg', 'Change config')
        res.redirect('/process')
    })

// Export routes
    module.exports = router




