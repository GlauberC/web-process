const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const configModel = require('../src/models/ConfigModel')
const should = chai.should();

chai.use(chaiHttp)

describe('Maude metaApply Test', () => {

    it('tell click', done => {

        let config1 = configModel(
            "def('d1, tell('a))",
            "tell('b) || tell('c)",
            "'d",
            "tell('a)"
        )
        let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constaints} > `
        chai.request(server)
            
            .get(`/maude/${entireConfig}/${config1.clickProcess}`)
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.code.should.be.equal(0)
                done()
        })
    })

    it('ask click', done => {

        let config1 = configModel(
            "def('d1, tell('a))",
            "ask 'd then tell ('b)",
            "'d",
            "ask 'd then tell ('b)"
        )
        let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constaints} > `
        chai.request(server)
            
            .get(`/maude/${entireConfig}/${config1.clickProcess}`)
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.code.should.be.equal(1)
                done()
        })
    })

    it('lask click', done => {

        let config1 = configModel(
            "def('d1, tell('a))",
            "lask 'd then tell ('b)",
            "'d",
            "lask 'd then tell ('b)"
        )
        let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constaints} > `

        chai.request(server)
            
            .get(`/maude/${entireConfig}/${config1.clickProcess}`)
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.code.should.be.equal(1)
                done()
        })
    })

    it('call click', done => {

        let config1 = configModel(
            "def('d1, tell('a))",
            "tell('b) || call('d1)",
            "'d",
            "call('d1)"
        )
        let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constaints} > `
        chai.request(server)
            
            .get(`/maude/${entireConfig}/${config1.clickProcess}`)
            .send(config1)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.code.should.be.equal(2)
                done()
        })
    })

    

})


