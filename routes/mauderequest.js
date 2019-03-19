
const express = require('express')
const router = express.Router()
const maudeAssist = require('../models/MaudeAssist')
const stringTreatment = require('../models/StringTreatment')



// Config routes
    router.post('/intialmetared', (req, res) => {
        var rawResult = maudeAssist.requestMaudeMetaRed(req.body.config)
        var initConfig = stringTreatment.MaudeResult(rawResult)
        res.cookie("init_config", initConfig)
        res.cookie('current_config', initConfig)
        res.cookie("clickable_procs", stringTreatment.getClickable_procs(initConfig))
        res.cookie('constraints', stringTreatment.getConstraints(initConfig))
        res.redirect('/')
    })
    router.get('/metaApp/:process', (req, res) => {
        var currentConfig = req.cookies['current_config']
        if(req.params.process.match(/^\s*tell/ig)){
            var tellParam = stringTreatment.getTellArgument(req.params.process)
            var rawResult = maudeAssist.requestMaudeMetaAppTell(currentConfig, tellParam)
            currentConfig = stringTreatment.MaudeResult(rawResult)

            res.cookie('current_config', currentConfig)
            res.cookie("clickable_procs", stringTreatment.getClickable_procs(currentConfig))
            res.cookie('constraints', stringTreatment.getConstraints(currentConfig))
            res.redirect('/')
        }else if(req.params.process.match(/ask.+then.+/ig)){
            console.log('ask')
            
            // rawResult = maudeAssist.requestMaudeMetaRed(currentConfig)
            // currentConfig = stringTreatment.MaudeResult(rawResult)
        }
    })

// Export routes
    module.exports = router




