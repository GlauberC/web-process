const maudeHelper = require('../helpers/maudeHelper')
const resultHelper = require('../helpers/resultHelper')
module.exports = {
    getConfigVisualization: async (def, process, constraints, redex) => {
        return new Promise(
            async (resolve, reject) => {
                setTimeout(()=> {
                    reject('getProcess - Timeout')
                }, 5000)
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
                                    let resultGetProcess = await maudeHelper.requestMaudeGetProcess(config, rSplit[0], rSplit[1])
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
                    setTimeout(() => {
                        resolve(vizualizationProcess.join(' && ') + ' ; ' + constraints)
                    }, 50)
                }else{
                    resolve('nil' + ' ; ' + constraints)
                }
            })
    }
}