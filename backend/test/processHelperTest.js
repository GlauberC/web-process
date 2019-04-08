const processHelper = require('../src/helpers/processHelper')
const chai = require('chai')
const expect = chai.expect

// 0 -> tell  // 1 -> ask or lask // 2 -> call // 404 -> error

describe('Code ProcessHelper', () => {

    it(`ask`, done => {
        const processAsk = "ask 'a then tell('b)"
        expect( processHelper.selectProcess(processAsk) ).be.equal(1)
        done()
    })
    it(`lask`, done => {
        const processLask = "lask 'a then tell('b)"
        expect( processHelper.selectProcess(processLask) ).be.equal(2)
        done()
    })
    it(`tell`, done => {
        const processTell = "tell('b)"
        expect( processHelper.selectProcess(processTell) ).be.equal(0)
        done()
    })
    it(`call`, done => {
        const processCall = "call('definition)"
        expect( processHelper.selectProcess(processCall) ).be.equal(5)
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

describe( 'getArg ProcessHelper', () => {
    it( 'tell', done => {
        const processTell = "tell('b)"
        let code = 0
        expect( processHelper.getArg( processTell, code).tell ).be.equal("'b")
        done()
    })
    it( 'ask ', done => {
        const processAsk = "ask 'a then tell('b)"
        code = 1
        expect( processHelper.getArg( processAsk, code).ask ).be.equal("'a")
        expect( processHelper.getArg( processAsk, code).then ).be.equal("tell('b)")
        done()
    })
    it( 'lask ', done => {
        const processlAsk = "lask 'a then tell('b)"
        code = 2
        expect( processHelper.getArg( processlAsk, code).lask ).be.equal("'a")
        expect( processHelper.getArg( processlAsk, code).then ).be.equal("tell('b)")
        done()
    })
    it( 'call', done => {
        const processCall = "call('d1)"
        let code = 5
        expect( processHelper.getArg( processCall, code).call ).be.equal("'d1")
        done()
    })
})


