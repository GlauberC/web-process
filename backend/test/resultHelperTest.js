const resulHelper = require('../src/helpers/resultHelper')
const configModel = require('../src/models/ConfigModel')
const chai = require('chai')
const expect = chai.expect






describe('resulHelper metaRed', () => {

    let resultMetared = `
        Maude> ==========================================
        reduce in META-CONFIG : metaRed(< def('d1, tell('a)) ; tell('b) || tell('c) ;
            'd >) .
        rewrites: 7 in 4ms cpu (5ms real) (1750 rewrites/second)
        result Config: < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >
        Maude> Bye.
        `
    let model = configModel("def('d1, tell('a))", "tell('b), tell('c)" , "'d")

    it(`Result helper:  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        const functionResult = resulHelper.createModel(resultMetared)
        expect(functionResult.definitions).be.equal(model.definitions)
        expect(functionResult.process).be.equal(model.process)
        expect(functionResult.constraints).be.equal(model.constraints)
        done()
    })

    let resultMetared2 = 
    `
    Maude> ==========================================
    reduce in META-CONFIG : metaRed(< def('d1, tell('a)) ; ask 'd then tell('c) +
        lask 'a then tell('g) ; 'd >) .
    rewrites: 6 in 4ms cpu (5ms real) (1500 rewrites/second)
    result Config: < def('d1, tell('a)) ; ask 'd then tell('c) + lask 'a then tell(
        'g) ; 'd >
    Maude> Bye.

    `
    let model2 = configModel("def('d1, tell('a))", "ask 'd then tell('c) + lask 'a then tell( 'g)",  "'d")

    it(`Result helper:  < def('d1, tell('a)) ; ask 'd then tell('c) + lask 'a then tell('g) ; 'd >`, done => {
        let functionResult = resulHelper.createModel(resultMetared2)
        expect(functionResult.definitions).be.equal(model2.definitions)
        expect(functionResult.process).be.equal(model2.process)
        expect(functionResult.constraints).be.equal(model2.constraints)
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
resultGetRedex3 = 
`
Maude> ==========================================
reduce in META-CONFIG : getRedex(< def('d1, tell('a)) ; ask 'd then tell('c) +
    lask 'a then tell('g) ; 'd >) .
rewrites: 12 in 0ms cpu (0ms real) (~ rewrites/second)
result LInfoRed: ir(0, 0, 'sum, 
	'LA':AskProcess <- 'lask_then_[''a.Sort C ('tell[''g.Sort])] ; 
	'Lp':List\`{Process\`} <- 'nil.List\`{Process\`} ; 
	'P:Process <- 'tell[''c.Sort] ; 
	'c:Constraint <- ''d.Sort) ;; getRedex$(lask 'a then tell('g), nil, 'd,
    0, 0)
Maude> Bye.

`

describe('# resulHelper getRedex', () => {

    it(`* getRedex  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        let clickableProcessResult = 
        [ 
          { ir: '0, None',
            processSubs: '\'tell, \'Lp\':List`{Process`} <- \'tell[\'\'c.Sort] ; \'c:Constraint <- \'\'b.Sort' },
          { ir: '1, None',
            processSubs: '\'tell, \'Lp\':List`{Process`} <- \'nil.List`{Process`} ; \'c:Constraint <- \'\'c.Sort' } 
        ] 
            
        const functionResult = resulHelper.getRedex(resultGetRedex)
        
        expect(functionResult[0].ir).be.equal(clickableProcessResult[0].ir)
        expect(functionResult[1].ir).be.equal(clickableProcessResult[1].ir)

        expect(functionResult[0].processSubs).be.equal(clickableProcessResult[0].processSubs)
        expect(functionResult[1].processSubs).be.equal(clickableProcessResult[1].processSubs)

        done()
    })

    it(`* getRedex  < def('d1, tell('a)) ; tell('b) || (ask 'a then tell ('e) ; 'd >`, done => {
        let clickableProcessResult = 
        [ 
          { ir: '0, None',
          processSubs: `'tell, 'Lp':List\`{Process\`} <- 'ask_then_[''f.Sort C ('tell[''a.Sort])] ; 'c:Constraint <- ''b.Sort` },
 
        ] 
            
        const functionResult = resulHelper.getRedex(resultGetRedex2)
        
        expect(functionResult[0].ir).be.equal(clickableProcessResult[0].ir)
        expect(functionResult[0].processSubs).be.equal(clickableProcessResult[0].processSubs)

        done()
    })

    // it(`* getRedex  < def('d1, tell('a)) ; (ask 'd then tell('c)) + (lask 'a then tell('g)) ; 'd >`, done => {
    //     let clickableProcessResult = 
    //     [ 
    //       { ir: '0, 0',
    //         processSubs: `Vai dar algo aqui` },
 
    //     ] 
            
    //     const functionResult = resulHelper.getRedex(resultGetRedex3)
        
    //     expect(functionResult[0].ir).be.equal(clickableProcessResult[0].ir)
    //     expect(functionResult[0].processSubs).be.equal(clickableProcessResult[0].processSubs)

    //     done()
    // })

    

    

})