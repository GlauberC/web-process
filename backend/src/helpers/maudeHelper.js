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
    requestMaudeMetaApp : async function (config, subs){
        try{
            return new Promise(
                async (resolve, reject) => {
                    setTimeout(()=> {
                        reject('MetaApp - Timeout')
                    }, 5000)
                    const func = `MTAP`
                    let subsSplit = subs.split(',')
                    console.log(subsSplit)
                    let command = `${func}${config}#${subsSplit[0].replace("'", "")}#${subsSplit[1].trim()}`
                    // let test = "MTAP< empty ; ( ( ask 'c then tell ( 'd ) )  + ( ask 'd then tell ( 'e ) ) ) || tell ( 'x ) ; 'c >#sum#'LA':AskProcess <- 'ask_then_[''d.Sort C ('tell[''e.Sort])] ;  'Lp':List`{Process`} <- 'tell[''x.Sort] ; 'P:Process <- 'tell[''d.Sort] ;  'c:Constraint <- ''c.Sort"
                    console.log(command)
                    let result = await connectionHelper(command)
                    resolve(result)
                }
            )
        }catch(err){
            console.log(err)
        }
    }
    
}