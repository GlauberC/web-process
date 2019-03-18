
const express = require('express')
const router = express.Router()
const shell = require('shelljs')
const shellescape = require('shell-escape');




// Config routes
    router.post('/metared', (req, res) => {
        // call requestMaude
        // update session
        res.redirect('/config')
    })


// Export routes
    module.exports = router


function requestMaude(config){
    var DIR_MAUDE = '/usr/bin/maude'
    var DIR_FILE_MAUDE = "../maude-system/process.maude -no-banner";

    var func = `metaRed`
    var command = `${func}(${config})`
    
    var command = shellescape(command.split(' '))
    
    var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
    var sliceResult = {
        init: result.search('Config:') + 'Config:'.length,
        end: result.search('Maude> Bye.')
    }
    return result.substring(sliceResult.init, sliceResult.end)



// // console.log(test)
}