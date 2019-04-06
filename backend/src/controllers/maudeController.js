const express = require("express")
const router = express.Router()
const maudeHelper = require('../helpers/maudeHelper')
const resultHelper = require('../helpers/resultHelper')



router.post('/', (req,res) => {
    const result = maudeHelper.requestMaudeMetaRed(
        req.body.definitions,
        req.body.process,
        req.body.constaints
    )   
    res.send(resultHelper.createModel(result))
})

module.exports = app => app.use('/maude', router)