module.exports = {
    getConfigVisualization: (process, constraints, redex) => {
        let processSplit = process.split('&&')
        let vizualizationProcess = []
        processSplit.forEach((p, index) => {
            if(!p.match(/^\s*\(*\s*l*ask/ig)){
                // there is no ask or lask
                var ir = index + ', None'
            }else{
                var sumSplit = p.split('+')
                if(sumSplit.length === 1){
                    // There is a ask or lask
                    var ir = index + ', 0'
                }else{
                    // There is a sum of asks or lasks 
                    var askProcess = []
                    sumSplit.forEach((pa, indexA)=> {
                        if(indexA === 0){
                            // remove first (
                            pa = pa.replace('\(', '')
                        }else if(indexA === sumSplit.length - 1){
                            // remove end )
                            pa = pa.replace(/\)\s*$/ig, '')
                        }
                        var ir = index + ', '+ indexA
                        redex.map((r) => {
                            if(r.ir == ir){
                                pa = 'c**' + pa.trim() + '**c'
                            }
                        })
                        askProcess.push(pa)
                    })
                    vizualizationProcess.push('(' + askProcess.join(' + ') + ')')
                    // jump next search
                    ir = ''
                }
            }
            if (ir !== ''){
                redex.map((r) => {
                    if(r.ir == ir){
                        p = 'c**' + p.trim() + '**c'
                    }
                })
                vizualizationProcess.push(p)
            }
        })
        return vizualizationProcess.join(' && ') + ' ; ' + constraints
    }
}