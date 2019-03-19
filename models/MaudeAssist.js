const shell = require('shelljs')
const shellescape = require('shell-escape');

var DIR_MAUDE = '/usr/bin/maude'
var DIR_FILE_MAUDE = "./maude-system/process.maude -no-banner"

module.exports = {
    requestMaudeMetaRed: function (config){

        var func = `metaRed`
        var command = `${func}(${config})`
        var command = shellescape(command.split(' '))

        
        var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeMetaAppTell: function (config, tellArg){

        var subs = `( 'C:Constraint  <- upTerm( ${tellArg} ) )`;
        var func = `metaApp`
        var command = `${func}( (${config} ), 'tell, ${subs} )`
        command = command.replace(/\n/ig, "")
        // return command
        var command = shellescape(command.split(' '))
        
        var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
}

