const express = require("express")
const router = express.Router()
const maudeHelper = require('../helpers/maudeHelper')
const resultHelper = require('../helpers/resultHelper')
const processHelper = require('../helpers/processHelper')



router.post( '/', async ( req, res ) => {
    try{
        const result = await maudeHelper.requestMaudeMetaRed(
            req.body.definitions,
            req.body.process,
            req.body.constaints
        )  
        res.send( resultHelper.createModel( result ) )
    } catch( err ) {
        return res.status( 406 ).send( err )
    }

})

router.get( '/:config/:process', ( req, res ) => {
    // 0 -> tell  // 1 -> ask or lask // 2 -> call // 404 -> error
    res.send( {code: processHelper.selectProcess( req.params.process ) } )

})

module.exports = app => app.use( '/maude', router )