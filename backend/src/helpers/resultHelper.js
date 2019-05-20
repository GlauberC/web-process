const configModel = require('../models/ConfigModel')
module.exports = {
    createModel : result => {
        const config = /Config:\s*(<\s.+\s>)/i.exec(result.replace(/\n/ig, '').replace(/\s+/ig, ' '))[1]
        const values = /<\s*(.+)\s*;\s*(.+)\s*;\s*(.+)\s*>/i.exec(config)
        return configModel(
            values[1].trim(),
            values[2].trim(),
            values[3].trim()
        )
        
    },
    getRedex : result => {
        let resultOneLine = /InfoRed:.+Maude> Bye./.exec(result.replace(/\n/ig, '').replace(/\t/ig, ''))
        let splitedResultOneLine = resultOneLine[0].replace('Maude> Bye.', '').split('InfoRed')[1]
        let separated = splitedResultOneLine.split(';;')
        let clickableProcess = []
        separated.map( process => {
            let newProcess = {ir: '', processSubs: ''}
            if(process.match(/ir\(\d,\s*None/ig)){
                let separateProcess = /ir\((\d,\s*None),\s*(.+)/ig.exec(process)
                newProcess.ir = separateProcess[1]
                newProcess.processSubs = separateProcess[2].replace(/\)\s*$/ig, '')
            }else{
                let separateProcess = /ir\((\d,\s*\d+),\s*(.+)/ig.exec(process)
                newProcess.ir = separateProcess[1]
                newProcess.processSubs = separateProcess[2].replace(/\)\s*$/ig, '')
            }
            
            clickableProcess.push(newProcess)
        })
        return clickableProcess
        
        

    },
    getProcess : result => {
        let resultOneLine = /result.+:(.+)/.exec(result.replace(/\n/ig, '').replace(/\t/ig, ''))
        let splitedResultOneLine = resultOneLine[1].replace('Maude> Bye.', '')
        return splitedResultOneLine
    },
    isOk : result => {
        return {ok: /Maude>\sConfig:/i.test(result) ? true : false}
    }
}