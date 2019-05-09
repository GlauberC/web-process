const chai = require('chai')
const expect = chai.expect


describe('resulHelper metaRed', () => {

    it(`Result helper:  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        const functionResult = resulHelper.createModel(resultMetared)
        expect(functionResult.definitions).be.equal(model.definitions)
        expect(functionResult.process).be.equal(model.process)
        expect(functionResult.constraints).be.equal(model.constraints)
        done()
    })

})



describe('# clickableProcessHelper', () => {

    it(`* clickableProcess  < def('d1, tell('a)) ; tell('b), tell('c) ; 'd >`, done => {
        let redex = 
        [
            {
              "ir": "0, None",
              "config": "'tell, 'Lp':List`{Process`} <- 'tell[''c.Sort] ; 'c:Constraint <- ''b.Sort) "
            },
            {
              "ir": "1, None",
              "config": "'tell, 'Lp':List`{Process`} <- 'nil.List`{Process`} ; 'c:Constraint <- ''c.Sort)"
            }
        ]
            
        // const functionResult = resulHelper.getRedex(resultGetRedex)
        
        // expect(functionResult[0].ir).be.equal(clickableProcessResult[0].ir)
        // expect(functionResult[1].ir).be.equal(clickableProcessResult[1].ir)

        // expect(functionResult[0].config).be.equal(clickableProcessResult[0].config)
        // expect(functionResult[1].config).be.equal(clickableProcessResult[1].config)

        done()
    })
   

})