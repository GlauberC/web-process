
const express = require('express')
const router = express.Router()
const shell = require('shelljs')
const shellescape = require('shell-escape');



// Config routes
    router.post('/metared', (req, res) => {
        var initConfig = requestMaude(req.body.config)
        req.flash("init_config", initConfig)
        req.flash("clickable_procs", getClickable_procs(initConfig))
        req.flash("constraints", getConstraints(initConfig))
        res.redirect('/')
    })
    router.get('/metaApp/:test', (req, res) => {
        res.send(req.params.test)
    })


// Export routes
    module.exports = router



function getClickable_procs(config){
    var re = /<\s*.+;/ig

    var separeted = re.exec(config)
    var procs = separeted[0].replace('<', '').replace(';', '')
    return procs.split(',')
}

function getConstraints(config){
    var re = /;.+/ig

    var separeted = re.exec(config)
    var constraints = separeted[0].replace('>', '').replace(';', '')
    return constraints
}




function requestMaude(config){
    var DIR_MAUDE = '/usr/bin/maude'
    var DIR_FILE_MAUDE = "./maude-system/process.maude -no-banner";

    var func = `metaRed`
    var command = `${func}(${config})`
    
    var command = shellescape(command.split(' '))
    
    var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
    var sliceResult = {
        init: result.search('Config:') + 'Config:'.length,
        end: result.search('Maude> Bye.')
    }
    return result.substring(sliceResult.init, sliceResult.end)
}

