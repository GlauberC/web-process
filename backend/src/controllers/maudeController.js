const express = require("express")
const router = express.Router()
const maudeHelper = require('../helpers/maudeHelper')
const resultHelper = require('../helpers/resultHelper')
const configVisunHelper = require('../helpers/configVisualizationHelper')
const ConfigModel = require('../models/ConfigModel')



router.post( '/', ( req, res ) => {
    
        maudeHelper.requestMaudeMetaRed(
            req.body.definitions,
            req.body.process,
            req.body.constraints
        ).then((resultMetaRed) => {
            maudeHelper.requestMaudeGetRedex(resultMetaRed)
            .then(resultRedex => {
                let resultMetaRedsplit = resultMetaRed.replace('<', '').replace('>', '').split(' ; ')
                let configuration = ConfigModel(resultMetaRedsplit[0].trim(), resultMetaRedsplit[1].trim(), resultMetaRedsplit[2].trim())
                let redex = resultHelper.getRedex(resultRedex)
                redex.map((p) => {
                    configuration.clickableProcessIndex.push( p.ir )
                })
                configVisunHelper.getConfigVisualization(
                        configuration.definitions,
                        configuration.process,
                        configuration.constraints,
                        redex
                ).then(configVisualization => {
                    configuration.configVisualization = configVisualization
                    res.send(configuration)
                })
                .catch(err => res.status(500).send(err))
            }).catch(err => res.status(500).send(err))
        }).catch(err => res.status(500).send(err))
})

router.post( '/parse', async ( req, res ) => {
    maudeHelper.requestMaudeMetaRed(
        req.body.definitions,
        req.body.process,
        req.body.constraints
    ).then((resultMetaRed) => {
        resultMetaRed === 'error' ? res.status(406).send('error') : res.send('ok')
    }).catch(err => res.status(500).send(err))
})

router.get( '/:config/:index', ( req, res ) => {
    let configStart =  `< ${req.params.config} >`
    let configurationSplit = req.params.config.split(';')
    maudeHelper.requestMaudeMetaRed(configurationSplit[0],
                                    configurationSplit[1],
                                    configurationSplit[2])
    .then(metaRedResult => 
        maudeHelper.requestMaudeGetRedex(metaRedResult)
        .then(resultCompareRedex => {
            const compareRedex = resultHelper.getRedex( resultCompareRedex )
            let subs = ''
            
            compareRedex.map(p => {
                if( p.ir === req.params.index ){
                    subs = p.processSubs
                }
            })
            maudeHelper.requestMaudeMetaApp( metaRedResult.trim(), subs )
            .then(resultMetaApp => {
                maudeHelper.requestMaudeGetRedex(resultMetaApp)
                .then(resultRedex => {
                    let resultMetaAppSplit = resultMetaApp.replace('<', '').replace('>', '').split(' ; ')
                    let configuration = ConfigModel(resultMetaAppSplit[0].trim(), resultMetaAppSplit[1].trim(), resultMetaAppSplit[2].trim())
                    let redex = ''
                    if (resultRedex !== 'nil'){
                        redex = resultHelper.getRedex(resultRedex)
                        redex.map((p) => {
                            configuration.clickableProcessIndex.push( p.ir )
                        })
                    }else{
                            redex = 'nil'
                    }
                    configVisunHelper.getConfigVisualization(
                        configuration.definitions,
                        configuration.process,
                        configuration.constraints,
                        redex
                    ).then(configVisualization => {
                        configuration.configVisualization = configVisualization
                        let indexs = req.params.index.split(',')
                        maudeHelper.requestMaudeGetProcess(metaRedResult, indexs[0], indexs[1])
                        .then(getProcessResult => {
                            configuration.from = getProcessResult.trim()
                            res.send(configuration)
                        })
                        .catch(err => res.status(500).send(err))
                    })
                    .catch(err => res.status(500).send(err))
                }).catch(err => res.status(500).send(err))
            }).catch(err => res.status(500).send(err))
        })
        .catch(err => res.status(500).send(err))
        )
    .catch(err => res.status(500).send(err))
})

router.get('/expand/horizontal/:config/:index/:size/:mode', async (req, res) => {
    maudeHelper.requestMaudeHorizontalMetaApp(req.params.config, req.params.index, req.params.size, req.params.mode)
    .then(response => {
        res.send(response)
    })
    .catch(err => res.status(500).send(err))
})

module.exports = app => app.use( '/maude', router )