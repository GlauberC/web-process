var net = require('net');
const {PromiseSocket} = require("promise-socket") 
const connectionHelper = require('./connectionHelper')




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
        // config = config.replace(/call\s*\(\s/ig, "call ( '")
        try{
            const func = `GTPR`
            let command = `${func}${config.trim()}#${index0.trim()}#${index1.trim()}`.trim()
            let result = await connectionHelper(command)
            return result
        }catch(err){
            console.log(err)
        }
    },
    requestMaudeParseMetaRed: async function (def, process, constraints){
        try{
        }catch(err){
            console.log(err)
        }
    },
    requestMaudeGetRedex : function (config){
        try{
            return new Promise(               
                async (resolve, reject) => {
                    if (config.split(';')[1].trim() === 'nil'){
                        resolve('nil')
                    }
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
    requestMaudeMetaApp : async function (config, subs){
        try{
            return new Promise(
                async (resolve, reject) => {
                    setTimeout(()=> {
                        reject('MetaApp - Timeout')
                    }, 5000)
                    const func = `MTAP`
                    let subsSplit = subs.split(',')
                    let command = `${func}${config}#${subsSplit[0].replace("'", "")}#${subsSplit[1].trim()}`
                    let result = await connectionHelper(command)
                    resolve(result)
                }
            )
        }catch(err){
            console.log(err)
        }
    }
    
}