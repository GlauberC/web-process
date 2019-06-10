const shell = require('shelljs')
const shellescape = require('shell-escape');
require('dotenv/config')
const connectionHelper = require('./connectionHelper')
// const stringTreatment = require('../helpers/StringTreatment')



var DIR_MAUDE = process.env.MAUDE_DIR
var DIR_FILE_MAUDE = "./maude/process.maude -no-banner"

module.exports = {
    requestMaudeMetaRed: async function (def, process, constraints){
        try{
            return new Promise(
                async (resolve, reject) => {
                    setTimeout(()=> {
                        reject('MetaRed - Timeout')
                    }, 5000)
                    const config = `< ${def} ; ${process} ; ${constraints} >`.replace(/\(/ig, ' ( ').replace(/\)/ig, ' ) ').replace(/\,/ig, ' , ')
                    const func = `MTRD`
                    let command = `${func}${config}`.trim()
                    let result = await connectionHelper(command)
                    resolve(result)
                }
            )
        }catch(err){
            console.log(err)
        }
    },
    requestMaudeGetProcess: async function(config, index0, index1){
        config = config.replace(/call\s*\(\s/ig, "call ( '")
        try{
            const func = `GTPR`
            let command = `${func}${config.trim()}#${index0.trim()}#${index1.trim()}`.trim()
            let result = await connectionHelper(command)
            return result
        }catch(err){
            console.log(err)
        }
    },
    requestMaudeParseMetaRed: function (def, process, constraints){

        const config = `< ${def} ; ${process} ; ${constraints} >`
        const func = `metaRed`
        let command = `${func}(${config})`
        command = command.replace(/\n/ig, "")
        command = shellescape(command.split(' '))
        return shell.exec(`timeout 30 sh -c "echo parse ${command} . | ${DIR_MAUDE} ${DIR_FILE_MAUDE}"`);
    },
    requestMaudeGetRedex : function (config){
        config = config.replace(/call\s*\(\s/ig, "call ( '")
        try{
            return new Promise(               
                async (resolve, reject) => {
                    setTimeout(()=> {
                        reject('GetRedex - Timeout')
                    }, 5000)
                    const func = `GRDX`
                    let command = `${func}${config}`.trim()
                    let result = await connectionHelper(command)
                    resolve(result)
                }
            )
        }catch(err){
            console.log(err)
        }
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