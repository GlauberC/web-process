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
        const redex = resultHelper.getRedex( resultGetRedex ) 
        configuration.configVisualization = configVisunHelper.getConfigVisualization(
            configuration.definitions,
            configuration.process,
            configuration.constraints,
            redex
        )
        redex.map((p) => {
            configuration.clickableProcessIndex.push( p.ir )
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

router.get( '/:config/:index', async ( req, res ) => {
     try{
        configurationSplit = req.params.config.split(';')

        const resultCompareRedex = await maudeHelper.requestMaudeGetRedex(
            configurationSplit[0],
            configurationSplit[1],
            configurationSplit[2]
        )

        const compareRedex = resultHelper.getRedex( resultCompareRedex )
        let subs = ''
        compareRedex.map(p => {
            if( p.ir === req.params.index ){
                subs = p.processSubs
            }
        })

        const resultMetaApp = maudeHelper.requestMaudeMetaApp( req.params.config, subs )
        const configuration = resultHelper.createModel( resultMetaApp )

        const resultGetRedex = await maudeHelper.requestMaudeGetRedex(
            configuration.definitions,
            configuration.process,
            configuration.constraints
        )
        const redex = resultHelper.getRedex( resultGetRedex ) 
        configuration.configVisualization = configVisunHelper.getConfigVisualization(
            configuration.definitions,
            configuration.process,
            configuration.constraints,
            redex
        )
        redex.map((p) => {
            configuration.clickableProcessIndex.push( p.ir )
        })
        res.send( configuration )

     } catch( err ){
        return res.status( 406 ).send( err )
     }
})

module.exports = app => app.use( '/maude', router )