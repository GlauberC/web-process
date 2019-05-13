module.exports = {
    getConfigVizualization: (process, constraints, redex) => {
        let processSplit = process.split('&&')
        let vizualizationProcess = []
        processSplit.forEach((p, index) => {
            if(!p.match(/^\s*\(*\s*l*ask/ig)){
                console.log(p)
                var ir = index + ', None'
            }else{
                var sum = p.split('+')
                if(sum.length === 1){
                    var ir = index + ', 0'
                }else{

                }
            }
            redex.map((r) => {
                if(r.ir == ir){
                    p = 'c**' + p.trim() + '**c'
                }
            })
            vizualizationProcess.push(p)
        })
        return vizualizationProcess.join(' && ') + ' ; ' + constraints
    }
}