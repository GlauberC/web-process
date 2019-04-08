const configModel = require('../models/ConfigModel')
module.exports = {
    createModel : result => {
        const config = /Config:\s*(<\s.+\s>)/i.exec(result)[1]
        const values = /<\s*(.+)\s*;\s*(.+)\s*;\s*(.+)\s*>/i.exec(config)

        return configModel(
            values[1].trim(),
            values[2].trim(),
            values[3].trim()
        )
        
    },
    isOk : result => {
        return {ok: /Maude>\sConfig:/i.test(result) ? true : false}
    }
}