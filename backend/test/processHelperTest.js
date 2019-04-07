const processHelper = require('../src/helpers/processHelper')
const chai = require('chai')
const expect = chai.expect

// 0 -> tell  // 1 -> ask or lask // 2 -> call // 404 -> error

describe('processHelper', () => {

    it(`ask`, done => {
        const processAsk = "ask 'a then tell('b)"
        expect( processHelper.selectProcess(processAsk) ).be.equal(1)
        done()
    })
    it(`lask`, done => {
        const processLask = "lask 'a then tell('b)"
        expect( processHelper.selectProcess(processLask) ).be.equal(1)
        done()
    })
    it(`tell`, done => {
        const processTell = "tell('b)"
        expect( processHelper.selectProcess(processTell) ).be.equal(0)
        done()
    })
    it(`call`, done => {
        const processCall = "call('definition)"
        expect( processHelper.selectProcess(processCall) ).be.equal(2)
        done()
    })
    it(`InvalidProcess`, done => {
        const processInvalid1 = "tall('definition)"
        const processInvalid2 = "ask 'f than tell('a)"
        const processInvalid3 = "cal('definition)"
        expect( processHelper.selectProcess( processInvalid1 ) ).be.equal(404)
        expect( processHelper.selectProcess( processInvalid2 ) ).be.equal(404)
        expect( processHelper.selectProcess( processInvalid3 ) ).be.equal(404)
        done()
    })


})


