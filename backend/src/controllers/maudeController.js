const express = require("express")
const router = express.Router()
const maudeHelper = require('../helpers/maudeHelper')
const resultHelper = require('../helpers/resultHelper')
const processHelper = require('../helpers/processHelper')
const configVisunHelper = require('../helpers/configVisualizationHelper')



router.post( '/', async ( req, res ) => {
    try{
        const resultMetaRed = await maudeHelper.requestMaudeMetaRed(
            req.body.definitions,
            req.body.process,
            req.body.constraints
        ) 
        const configuration = resultHelper.createModel( resultMetaRed )
        const resultGetRedex = await maudeHelper.requestMaudeGetRedex(
            configuration.definitions,
            configuration.process,
            configuration.constraints
        )
        const redex = resultHelper.getRedex(resultGetRedex) 
        configuration.configVisualization = configVisunHelper.getConfigVisualization(
            configuration.process,
            configuration.constraints,
            redex
        )
        redex.map((p) => {
            configuration.clickableProcessIndex.push(p.ir)
        })
        res.send( configuration )
    } catch( err ) {
        return res.status( 406 ).send( err )
    }
})

router.post( '/parse', async ( req, res ) => {
    try{
        const result = await maudeHelper.requestMaudeParseMetaRed(
            req.body.definitions,
            req.body.process,
            req.body.constraints
        )  
        if( resultHelper.isOk( result ).ok ){
            res.status( 200 ).send( 'ok' )
        }else {
            return res.status( 406 ).send( err )
        }
        
    } catch( err ) {
        return res.status( 406 ).send( err )
    }

})

router.get( '/:config/:process', async ( req, res ) => {
    // 0 -> tell  // 1 -> ask or lask // 2 -> call // 404 -> error
    const codeProcess = processHelper.selectProcess( req.params.process )
    let result

    if( codeProcess == 0 ){
        try {
            const argTell = processHelper.getArg( req.params.process , codeProcess ).tell
            result = maudeHelper.requestMaudeMetaAppTell( req.params.config, argTell )
            res.send( resultHelper.createModel( result ) )
        } catch(err) {
            return res.status( 406 ).send( err )
        }
    }else if( codeProcess == 1 ){
        try {
            const args = processHelper.getArg( req.params.process , codeProcess )
            result = maudeHelper.requestMaudeMetaAppAsk( req.params.config, args.ask, args.then )
            res.send( resultHelper.createModel( result ) )
        } catch(err) {
            return res.status( 406 ).send( err )
        }
    }else if( codeProcess == 2 ){
        try {
            const args = processHelper.getArg( req.params.process , codeProcess )
            result = maudeHelper.requestMaudeMetaAppLask( req.params.config, args.lask, args.then )
            res.send( resultHelper.createModel( result ) )
        } catch(err) {
            return res.status( 406 ).send( err )
        }
    }
    

})

module.exports = app => app.use( '/maude', router )