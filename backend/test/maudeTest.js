const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const configModel = require('../src/models/ConfigModel')
const should = chai.should();

const config1 = configModel(
    "'d1, tell('a)",
    "tell('b)",
    "'d",
    ""
)


chai.use(chaiHttp)

describe('Maude', () => {

    it('MetaRed ok, send, receive Maude metaRed result', done => {

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

})


