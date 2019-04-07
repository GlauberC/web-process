// 0 -> tell  // 1 -> ask or lask // 2 -> call // 404 -> error

module.exports = {
    selectProcess : (process) => {
        if( /^l*ask\s*.+then\s*.+/i.test( process ) ){
            return 1
        }else if( /^tell.+/i.test( process ) ){
            return 0
        }else if(/^call.+/i.test( process ) ){
            return 2
        }else{
            return 404
        }
    }
}