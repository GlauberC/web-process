const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const configModel = require('../src/models/ConfigModel')
const should = chai.should();





chai.use(chaiHttp)

describe('Maude metaRed Test', () => {

    it('OK status', done => {

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
                res.body.process.should.be.equal("tell('b), tell('c)")
                res.body.constaints.should.be.equal("'d")
                done()
        })
    })

    it('Error', done => {

        const config2 = configModel(
            "def('d1 tell('a))",
            "tell('b) || tell('c)",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/')
            .send(config2)
            .end( (err, res) => {
                res.should.have.status(406)
                done()
        })
    })

})

describe('Maude Parse metaRed Test', () => {

    it('OK status 1', done => {

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
    it('OK status 2', done => {

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

    it('Error', done => {

        const config2 = configModel(
            "def('d1 tell('a))",
            "tell('b) || tell(c)",
            "'d",
            ""
        )

        chai.request(server)
            .post('/maude/parse/')
            .send(config2)
            .end( (err, res) => {
                res.should.have.status(406)
                done()
        })
    })

})


