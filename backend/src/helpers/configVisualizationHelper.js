const maudeHelper = require('../helpers/maudeHelper')
const resultHelper = require('../helpers/resultHelper')
module.exports = {
    getConfigVisualization: (def, process, constraints, redex) => {
        let config = `< ${def} ; ${process} ; ${constraints}  >`
        let processSplit = process.split('&&')
        let vizualizationProcess = []
        var ir = ''
        processSplit.forEach((p, index) => {
            if(!p.match(/^\s*\(*\s*l*ask/ig)){
                // there is no ask or lask
                ir = index + ', None'
            }else{
                redex.map(r => {
                    let rSplit = r.ir.split(',')
                    if(index === Number(rSplit[0])){
                        let resultGetProcess = maudeHelper.requestMaudeGetProcess(config, rSplit[0], rSplit[1])
                        let getProcess = resultHelper.getProcess(resultGetProcess).trim()
                        p = p.replace(getProcess, `c**${getProcess}**c`)
                        ir = ''
                    }
                })
            }
            if (ir !== ''){
                redex.map((r2) => {
                    if(r2.ir == ir){
                        p = 'c**' + p.trim() + '**c'
                    }
                })
                vizualizationProcess.push(p)
                
            }else{
                vizualizationProcess.push(p)
            }
        })
        
        console.log(vizualizationProcess.join(' && ') + ' ; ' + constraints)
        return vizualizationProcess.join(' && ') + ' ; ' + constraints
    }
}