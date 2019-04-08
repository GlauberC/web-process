const shell = require('shelljs')
const shellescape = require('shell-escape');
require('dotenv/config')
// const stringTreatment = require('../helpers/StringTreatment')


var DIR_MAUDE = process.env.MAUDE_DIR
var DIR_FILE_MAUDE = "./maude/process.maude -no-banner"

module.exports = {
    requestMaudeMetaRed: function (def, process, constraints){
        const config = `< ${def} ; ${process} ; ${constraints} >`
        const func = `metaRed`
        let command = `${func}(${config})`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))

        
        const result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeMetaAppTell: function (config, tellArg){

        const subs = `( 'C:Constraint  <- upTerm( ${tellArg} ) )`
        const func = `metaApp`
        let command = `${func}( ( ${config} ) , 'tell, ${subs} )`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))
        
        return result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);

    },
    requestMaudeMetaAppAsk: function(config, askArg, thenArg){
        const subs = `'C:Constraint <- upTerm( ${askArg} ) ; 'P:Process <- upTerm( ${thenArg})`
        const func = `metaApp`
        let command = `${func}( ${config} , 'askthen, (${subs}) )`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))
        
        var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeMetaAppLask: function(config, askArg, thenArg){
        const subs = `'C:Constraint <- upTerm( ${askArg} ) ; 'P:Process <- upTerm( ${thenArg})`
        const func = `metaApp`
        let command = `${func}( ${config} , 'laskthen, (${subs}) )`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))
        
        var result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeParseMetaRed: function (def, process, constraints){

        const config = `< ${def} ; ${process} ; ${constraints} >`
        const func = `metaRed`
        let command = `${func}(${config})`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))
        return shell.exec(`timeout 30 sh -c "echo parse ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
    }
    
}