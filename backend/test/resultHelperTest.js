const resulHelper = require('../src/helpers/resultHelper')
const configModel = require('../src/models/ConfigModel')
const chai = require('chai')
const expect = chai.expect


const resultMetared = `
Maude> ==========================================
reduce in META-CONFIG : metaRed(< def('d1, tell('a)) ; tell('b) || tell('c) ;
    'd >) .
rewrites: 7 in 4ms cpu (5ms real) (1750 rewrites/second)
result Config: < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >
Maude> Bye.
`
const model = configModel("def('d1, tell('a))", "tell('b), tell('c)" , "'d")


describe('resulHelper metaRed', () => {

    it(`Result helper:  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        const functionResult = resulHelper.createModel(resultMetared)
        expect(functionResult.definitions).be.equal(model.definitions)
        expect(functionResult.process).be.equal(model.process)
        expect(functionResult.constraints).be.equal(model.constraints)
        done()
    })

})


const resultGetRedex = `
Maude> ==========================================
reduce in META-CONFIG : getRedex(< def('d1, tell('a)) ; tell('b) tell('c) ; 'd
    >) .
rewrites: 12 in 0ms cpu (0ms real) (~ rewrites/second)
result LInfoRed: ir(0, None, 'tell, 
	'Lp':List\`{Process\`} <- 'tell[''c.Sort] ; 
	'c:Constraint <- ''b.Sort) ;; ir(1, None, 'tell, 
	'Lp':List\`{Process\`} <- 'nil.List\`{Process\`} ; 
	'c:Constraint <- ''c.Sort)
Maude> Bye.
`

resultGetRedex2 = 
`
Maude> ==========================================
reduce in META-CONFIG : getRedex(< def('d1, tell('a)) ; tell('b) (ask 'f then
    tell('a)) ; 'd >) .
rewrites: 14 in 0ms cpu (0ms real) (~ rewrites/second)
result InfoRed: ir(0, None, 'tell, 
	'Lp':List\`{Process\`} <- 'ask_then_[''f.Sort C ('tell[''a.Sort])] ; 
	'c:Constraint <- ''b.Sort)
Maude> Bye.

`

describe('# resulHelper getRedex', () => {

    it(`* getRedex  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        let clickableProcessResult = 
        [ 
          { ir: '0, None',
            config: '\'tell, \'Lp\':List`{Process`} <- \'tell[\'\'c.Sort] ; \'c:Constraint <- \'\'b.Sort) ' },
          { ir: '1, None',
            config: '\'tell, \'Lp\':List`{Process`} <- \'nil.List`{Process`} ; \'c:Constraint <- \'\'c.Sort)' } 
        ] 
            
        const functionResult = resulHelper.getRedex(resultGetRedex)
        
        expect(functionResult[0].ir).be.equal(clickableProcessResult[0].ir)
        expect(functionResult[1].ir).be.equal(clickableProcessResult[1].ir)

        expect(functionResult[0].config).be.equal(clickableProcessResult[0].config)
        expect(functionResult[1].config).be.equal(clickableProcessResult[1].config)

        done()
    })

    it(`* getRedex  < def('d1, tell('a)) ; tell('b) || (ask 'a then tell ('e) ; 'd >`, done => {
        let clickableProcessResult = 
        [ 
          { ir: '0, None',
            config: `'tell, 'Lp':List\`{Process\`} <- 'ask_then_[''f.Sort C ('tell[''a.Sort])] ; 'c:Constraint <- ''b.Sort)` },
 
        ] 
            
        const functionResult = resulHelper.getRedex(resultGetRedex2)
        
        expect(functionResult[0].ir).be.equal(clickableProcessResult[0].ir)
        expect(functionResult[0].config).be.equal(clickableProcessResult[0].config)

        done()
    })

    

    

})