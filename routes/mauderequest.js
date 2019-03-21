
const express = require('express')
const router = express.Router()
const maudeAssist = require('../helpers/MaudeAssist')
const stringTreatment = require('../helpers/StringTreatment')



// Config routes
    router.post('/intialmetared', (req, res) => {
        var rawResult = maudeAssist.requestMaudeMetaRed(req.body.config)
        var initConfig = stringTreatment.MaudeResult(rawResult)
        console.log(initConfig)
        res.cookie("init_config", initConfig)
        res.cookie("current_config", initConfig)
        res.cookie("clickable_procs", stringTreatment.getClickable_procs(initConfig))
        res.cookie('constraints', stringTreatment.getConstraints(initConfig))
        req.flash('success_msg', 'New configuration started')
        res.redirect('/process')

    })

    router.get('/metaApp/:process', (req, res) => {
        var rawResult = maudeAssist.requestMaudeMetaApp(req.cookies['current_config'], req.params.process)
        var config = stringTreatment.MaudeResult(rawResult)
        res.cookie('current_config', config)
        res.cookie("clickable_procs", stringTreatment.getClickable_procs(config))
        res.cookie('constraints', stringTreatment.getConstraints(config))
        req.flash('success_msg', 'The command was successfully')
        res.redirect('/process')
    })

// Export routes
    module.exports = router




