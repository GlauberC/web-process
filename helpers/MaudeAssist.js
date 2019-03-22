const shell = require('shelljs')
const shellescape = require('shell-escape');
require('dotenv/config')
const stringTreatment = require('../helpers/StringTreatment')

var DIR_MAUDE = process.env.MAUDE_DIR
var LIB_MAUDE = process.env.MAUDE_LIB
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

        var subs = `( 'C:Constraint  <- upTerm( ${tellArg} ) )`
        var func = `metaApp`
        var command = `${func}( (${config} ), 'tell, ${subs} )`
        command = command.replace(/\n/ig, "")
        var command = shellescape(command.split(' '))
        
        var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeMetaAppAsk: function(config, askArg, thenArg){
        var subs = `'C:Constraint <- upTerm( ${askArg} ) ; 'P:Process <- upTerm( ${thenArg})`
        var func = `metaApp`
        var command = `${func}( ${config} , 'askthen, (${subs}) )`
        command = command.replace(/\n/ig, "")
        console.log(command)
        command = shellescape(command.split(' '))
        
        var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result


    },
    requestMaudeMetaApp: function (config, process){
        var result = ""
        if(process.match(/^\s*tell/ig)){
            var tellParam = stringTreatment.getTellArgument(process)
            var result = this.requestMaudeMetaAppTell(config, tellParam)
        }else if(process.match(/ask.+then.+/ig)){
            var askParam = stringTreatment.getAskArgument(process)
            var thenParam = stringTreatment.getThenArgument(process)
            result = this.requestMaudeMetaAppAsk(config, askParam, thenParam)
        }
        return result

    },
    requestMaudeParseMetaRed: function (config){

        var func = `metaRed`
        var command = `${func}(${config})`
        var command = shellescape(command.split(' '))
        var result = shell.exec(`timeout 30 sh -c "echo parse ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    }
    
}

