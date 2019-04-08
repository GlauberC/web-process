// 0 -> tell  // 1 -> ask // 2 -> lask // 3 -> sum // 4 -> lsum // 5 -> call // 404 -> error

module.exports = {
    selectProcess : (process) => {
        if( /^ask\s*.+then\s*.+/i.test( process ) ){
            return 1
        }else if( /^lask\s*.+then\s*.+/i.test( process ) ){
            return 2
        }else if( /^tell.+/i.test( process ) ){
            return 0
        }else if(/^call.+/i.test( process ) ){
            return 5
        }else{
            return 404
        }
    },

    getArg : (process, code) => {
        let arg = {}
        if( code == 0 ) {
            arg = {tell: /tell\((.+)\)/i.exec(process)[1]}
            return arg

        }else if ( code == 1 ){
            arg = {
                ask: /ask\s(\'\w+)\sthen/i.exec(process)[1],
                then: /then\s(.+)/i.exec(process)[1]
            }
            return arg

        }else if ( code == 2 ){
            arg = {
                lask: /lask\s(\'\w+)\sthen/i.exec(process)[1],
                then: /then\s(.+)/i.exec(process)[1]
            }
            return arg

        }else if ( code == 5 ){
            arg = {call: /call\((.+)\)/i.exec(process)[1]}
            return arg
        }
    }
}