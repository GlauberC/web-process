// const chai = require('chai')
// const server = require('../index')
// const chaiHttp = require('chai-http')
// const configModel = require('../src/models/ConfigModel')
// const should = chai.should();

// chai.use(chaiHttp)

// describe('Maude metaApply Test', () => {

//     it('tell click', done => {

//         let config1 = configModel(
//             "def('d1, tell('a))",
//             "tell('a) || tell('c)",
//             "'d",
//             "tell('a)"
//         )
//         let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constraints} > `
//         chai.request(server)
            
//             .get(`/maude/${entireConfig}/${config1.clickProcess}`)
//             .send(config1)
//             .end( (err, res) => {
//                 res.should.have.status(200)
//                 res.body.process.should.be.equal(`tell('c)`)
//                 res.body.constraints.should.be.equal(`'a, 'd`)
//                 done()
//         })
//     })

//     it('ask click', done => {

//         let config1 = configModel(
//             "def('d1, tell('a))",
//             "ask 'd then tell ('b)",
//             "'d",
//             "ask 'd then tell ('b)"
//         )
//         let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constraints} > `
//         chai.request(server)
            
//             .get(`/maude/${entireConfig}/${config1.clickProcess}`)
//             .send(config1)
//             .end( (err, res) => {
//                 res.should.have.status(200)
//                 res.body.process.should.be.equal(`tell('b)`)
//                 res.body.constraints.should.be.equal(`'d`)
//                 done()
//         })
//     })
//     it('lask click', done => {

//         let config1 = configModel(
//             "def('d1, tell('a))",
//             "lask 'd then tell ('b)",
//             "'a, 'd",
//             "lask 'd then tell ('b)"
//         )
//         let entireConfig = `< ${config1.definitions} ; ${config1.process} ; ${config1.constraints} > `
//         chai.request(server)
            
//             .get(`/maude/${entireConfig}/${config1.clickProcess}`)
//             .send(config1)
//             .end( (err, res) => {
//                 res.should.have.status(200)
//                 res.body.process.should.be.equal(`tell('b)`)
//                 res.body.constraints.should.be.equal(`'a`)
//                 done()
//         })
//     })
// })


