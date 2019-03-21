
const express = require('express')
const router = express.Router()
const maudeAssist = require('../service/MaudeAssist')
const stringTreatment = require('../service/StringTreatment')



// Config routes
    router.post('/intialmetared', (req, res) => {
        var rawResult = maudeAssist.requestMaudeMetaRed(req.body.config)
        var initConfig = stringTreatment.MaudeResult(rawResult)
        res.cookie("init_config", initConfig)
        res.cookie("current_config", initConfig)
        res.cookie("clickable_procs", stringTreatment.getClickable_procs(initConfig))
        res.cookie('constraints', stringTreatment.getConstraints(initConfig))
        res.redirect('/')
    })
    router.get('/metaApp/:process', (req, res) => {
        var rawResult = maudeAssist.requestMaudeMetaApp(req.cookies['current_config'], req.params.process)
        var config = stringTreatment.MaudeResult(rawResult)
        res.cookie('current_config', config)
        res.cookie("clickable_procs", stringTreatment.getClickable_procs(config))
        res.cookie('constraints', stringTreatment.getConstraints(config))
        res.redirect('/')
    })

// Export routes
    module.exports = router




