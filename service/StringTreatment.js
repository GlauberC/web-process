module.exports = {
    getClickable_procs: function (config){
        var re = /<\s*.+;/ig

        var separeted = re.exec(config)
        var procs = separeted[0].replace('<', '').replace(';', '')
        return procs.split(',')
    },

    getConstraints: function (config){
        var re = /;.+/ig

        var separeted = re.exec(config)
        var constraints = separeted[0].replace('>', '').replace(';', '')
        return constraints
    },
    getTellArgument: function(config){
        return /tell\s*\((.+)\)/ig.exec(config)[1]
    },
    MaudeResult: function(result){
        var sliceResult = {
            init: result.search('result Config: ') + 'result Config: '.length,
            end: result.search('Maude> Bye.')
        }
        return result.substring(sliceResult.init, sliceResult.end)
    }
}