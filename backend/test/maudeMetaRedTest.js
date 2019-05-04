const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const configModel = require('../src/models/ConfigModel')
const should = chai.should();





chai.use(chaiHttp)

describe('#### Maude metaRed ', () => {

    it(`**** <def('d1, tell('a)) ; tell('b) || tell('c) ; 'd > `, done => {

        const config1 = configModel(
            "def('d1, tell('a))",
            "tell('b) || tell('c)",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/')
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.definitions.should.be.equal("def('d1, tell('a))")
                res.body.process.should.be.equal("tell('b) tell('c)")
                res.body.constraints.should.be.equal("'d")
                res.body.clickableProcess[0].ir.should.be.equal('0, None')
                res.body.clickableProcess[1].ir.should.be.equal('1, None')
                done()
        })
    })

    it(`**** <def('d1, tell('a)) ; tell('b) || ( ask 'f then tell ('a) ) ; 'd > `, done => {

        const config1 = configModel(
            "def('d1, tell('a))",
            "tell('b) || ( ask 'f then tell ('a) )",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/')
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.definitions.should.be.equal("def('d1, tell('a))")
                res.body.process.should.be.equal("tell('b) (ask 'f then tell('a))")
                res.body.constraints.should.be.equal("'d")
                res.body.clickableProcess[0].ir.should.be.equal('0, None')
                done()
        })
    })

    it(`**** <def('d1, tell('a)) ; tell('b) || ( ask 'f then tell ('a) ) || ( ask 'd then tell ('e) ) || tell('x) ; 'd > `, done => {

        const config1 = configModel(
            "def('d1, tell('a))",
            "tell('b) || ( ask 'f then tell ('a) ) || ( ask 'd then tell ('e) ) || tell('x)",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/')
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.definitions.should.be.equal("def('d1, tell('a))")
                res.body.process.should.be.equal("tell('b) (ask 'f then tell('a)) (ask 'd then tell('e)) tell('x)")
                res.body.constraints.should.be.equal("'d")
                res.body.clickableProcess[0].ir.should.be.equal('0, None')
                res.body.clickableProcess[1].ir.should.be.equal('2, 0')
                res.body.clickableProcess[2].ir.should.be.equal('3, None')
                done()
        })
    })

    it(`**** <def('d1, tell('a)) ; ( ask 'f then tell ('a) ) + ( ask 'd then tell ('e) ) ; 'd > `, done => {

        const config1 = configModel(
            "def('d1, tell('a))",
            "( ask 'f then tell ('a) ) + ( ask 'd then tell ('e) )",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/')
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.definitions.should.be.equal("def('d1, tell('a))")
                res.body.process.should.be.equal("ask 'f then tell('a) + ask 'd then tell( 'e)")
                res.body.constraints.should.be.equal("'d")
                res.body.clickableProcess[0].ir.should.be.equal('0, 1')
                done()
        })
    })

})
describe('#### Maude Parse metaRed Test', () => {

    it('**** OK status 1', done => {

        const config1 = configModel(
            "def('d1, tell('a))",
            "tell('b) || tell('c)",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/parse/')
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                done()
        })
    })
    it('* OK status 2', done => {

        const config2 = configModel(
            "def('d1, tell('a))",
            "lask 'a then tell('b)",
            "'a",
            ""
        )

        chai.request(server)
            .post('/maude/parse/')
            .send(config2)
            .end( (err, res) => {
                res.should.have.status(200)
                done()
        })
    })
})


