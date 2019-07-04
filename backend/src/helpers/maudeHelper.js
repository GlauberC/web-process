const connectionHelper = require('./connectionHelper')
const resultHelper = require('./resultHelper')
const ConfigModel = require('../models/ConfigModel')




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
    },
    requestMaudeHorizontalMetaApp : function(config,index,size,mode){
        try{
            return new Promise(
                async (resolve, reject) => {
                    setTimeout(()=> {
                        reject('Horizontal Expand - Timeout')
                    }, 5000)


                    let configPerfect = `< ${config} >`.replace(/\(/ig, ' ( ').replace(/\)/ig, ' ) ').replace(/\,/ig, ' , ')
                    let metaRedResult = await this.metaredExpand(configPerfect)
                    let resultCompareRedex = await this.getRedexExpand(metaRedResult)
                    let compareRedex = resultHelper.getRedex( resultCompareRedex )
                    let subs = ''
                    compareRedex.map(p => {
                        if( p.ir === index ){
                            subs = p.processSubs
                        }
                    })
                    let metaAppResult = await this.MetaAppExpand(metaRedResult.trim(), subs)
                    let redexResult = await this.getRedexExpand(metaAppResult)
                    let resultMetaAppSplit = metaAppResult.replace('<', '').replace('>', '').split(' ; ')
                    let configuration = ConfigModel(resultMetaAppSplit[0].trim(), resultMetaAppSplit[1].trim(), resultMetaAppSplit[2].trim())
                    let redex = ''
                    if (redexResult !== 'nil'){
                        redex = resultHelper.getRedex(redexResult)
                        redex.map((p) => {
                            configuration.clickableProcessIndex.push( p.ir )
                        })
                    }else{
                            redex = 'nil'
                    }
                    let configVisu = await this.configVisu(
                        configuration.definitions,
                        configuration.process,
                        configuration.constraints,
                        redex
                    )
                    resolve(configVisu)

                    
                }
            )
        }catch(err){
            console.log(err)
        }
    },
    metaredExpand: async function(config){
        const func = `MTRD`
        let command = `${func}${config}`.trim()
        let result = await connectionHelper(command)
        return result
    },
    getRedexExpand: async function(config){
        if (config.split(';')[1].trim() === 'nil'){
            return 'nil'
        }
        const func = `GRDX`
        let command = `${func}${config}`.trim()
        let result = await connectionHelper(command)
        return result
    },MetaAppExpand: async function(config, subs){
        const func = `MTAP`
        let subsSplit = subs.split(',')
        let command = `${func}${config}#${subsSplit[0].replace("'", "")}#${subsSplit[1].trim()}`
        let result = await connectionHelper(command)
        return result
    },
    configVisu:  async function(def, process, constraints, redex){
        if(process !== 'nil'){
            let config = `< ${def} ; ${process} ; ${constraints}  >`
            let processSplit = process.split('&&')
            let vizualizationProcess = []
            var ir = ''
            await processSplit.forEach(async (p, index) => {
                if(!p.match(/^\s*\(*\s*l*ask/ig)){
                    // there is no ask or lask
                    ir = index + ', None'
                }else{
                    for(let i = 0; i<redex.length; i++){
                        let rSplit = redex[i].ir.split(',')
                        if(index === Number(rSplit[0])){
                            let resultGetProcess = await this.requestMaudeGetProcess(config, rSplit[0], rSplit[1])
                            p = await p.trim().replace(resultGetProcess.trim(), `c**${resultGetProcess}**c`)
                        }
                    }      
                }                   
                if (ir !== ''){
                    redex.map((r2) => {
                        if(r2.ir == ir){
                            p = 'c**' + p.trim() + '**c'
                            ir = ''
                        }
                    })
                    vizualizationProcess.push(p)                            
                }else{
                    vizualizationProcess.push(p) 
                }
            })
            let test = vizualizationProcess.join(' && ') + ' ; ' + constraints
            return test
            
        }else{
            return 'nil' + ' ; ' + constraints
        }
    }
    
}