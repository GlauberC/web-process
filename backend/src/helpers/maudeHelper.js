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
    requestMaudeGetProcess: function(config, index0, index1){
        const func = `getProcess`
        let command = `${func}(${config}, ${index0} , ${index1})`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))

        const result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeParseMetaRed: function (def, process, constraints){

        const config = `< ${def} ; ${process} ; ${constraints} >`
        const func = `metaRed`
        let command = `${func}(${config})`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))
        return shell.exec(`timeout 30 sh -c "echo parse ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
    },
    requestMaudeGetRedex : function (def, process, constraints){
        const config = `< ${def} ; ${process} ; ${constraints} >`
        const func = `getRedex`
        let command = `${func}(${config})`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))

        
        const result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    },
    requestMaudeMetaApp : function (config, subs){
        config = `< ${config} >`
        const func = `metaApp`
        let command = `${func}( ${config} , ${subs} )`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' ')).replace(/\`/ig, "\\`")
        
        const result = shell.exec(`timeout 30 sh -c "echo red ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
        return result
    }
    
}