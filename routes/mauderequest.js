
const express = require('express')
const router = express.Router()
const maudeAssist = require('../helpers/MaudeAssist')
const stringTreatment = require('../helpers/StringTreatment')



// Config routes
    router.post('/intialmetared', (req, res) => {
        var parseResult = maudeAssist.requestMaudeParseMetaRed(req.body.config)
        res.cookie('inputInitial', req.body.config)
        new Promise((resolve, reject) => {
            if(parseResult.stderr || /\[Config\]:/ig.test(parseResult)){
                if(parseResult.stderr){
                    reject(parseResult.stderr)
                }else{reject('Invalid Configuration')}
            }else{resolve()}
        }).then(() => {
            var rawResult = maudeAssist.requestMaudeMetaRed(req.body.config)
            var initConfig = stringTreatment.MaudeResult(rawResult)
            res.cookie("init_config", initConfig)
            res.cookie("current_config", initConfig)
            res.cookie("clickable_procs", stringTreatment.getClickable_procs(initConfig))
            res.cookie('constraints', stringTreatment.getConstraints(initConfig))
            req.flash('success_msg', 'New configuration started')
            res.redirect('/process')
        })
        .catch(err => {
            req.flash('error_msg', err)
            res.redirect('/')
        })





    })

    router.get('/metaApp/:process', (req, res) => {
        new Promise((resolve, reject) => {
            var rawResult = maudeAssist.requestMaudeMetaApp(req.cookies['current_config'], req.params.process)
            if(/result Config: error/ig.test(rawResult)){
                reject('This operation cannot be executed')
            }else{resolve(rawResult)}
        }).then(rawResult => {
            var config = stringTreatment.MaudeResult(rawResult)
            res.cookie('current_config', config)
            res.cookie("clickable_procs", stringTreatment.getClickable_procs(config))
            res.cookie('constraints', stringTreatment.getConstraints(config))
            req.flash('success_msg', 'The command was executed successfully')
            res.redirect('/process')
        })
        .catch(err => {
            req.flash('error_msg', err)
            res.redirect('/process')
        })
        
        
        
    })

// Export routes
    module.exports = router




