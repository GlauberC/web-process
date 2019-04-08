const resulHelper = require('../src/helpers/resultHelper')
const configModel = require('../src/models/ConfigModel')
const chai = require('chai')
const expect = chai.expect


const result = `
Maude> ==========================================
reduce in META-CONFIG : metaRed(< def('d1, tell('a)) ; tell('b) || tell('c) ;
    'd >) .
rewrites: 7 in 4ms cpu (5ms real) (1750 rewrites/second)
result Config: < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >
Maude> Bye.
`
const model = configModel("def('d1, tell('a))", "tell('b), tell('c)" , "'d")


describe('resulHelper', () => {

    it(`Result helper:  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        const functionResult = resulHelper.createModel(result)
        expect(functionResult.definitions).be.equal(model.definitions)
        expect(functionResult.process).be.equal(model.process)
        expect(functionResult.constraints).be.equal(model.constraints)
        done()
    })

})


