const configVisuHelper = require('../src/helpers/configVisualizationHelper')
const chai = require('chai')
const expect = chai.expect


describe('Config Visualization', () => {

    it(`Config Visualization helper: only Tells`, done => {
        let process = "tell('b) && tell('c)"
        let constraints = "'d"
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
        let configResult = "c**tell('b)**c && c**tell('c)**c ; 'd"
        const functionResult = configVisuHelper.getConfigVisualization(process, constraints, redex)
        expect(functionResult).be.equal(configResult)

        done()
    })

    it(`Config Visualization helper:  Tell and Ask`, done => {
      let process = "tell('b) && (ask 'd then tell('c))"
      let constraints = "'d"
      let redex = 
      [
        {
          "ir": "0, None",
          "config": "'tell, 'Lp':List`{Process`} <- 'ask_then_[''d.Sort C ('tell[''c.Sort])] ; 'c:Constraint <- ''b.Sort "
        },
        {
          "ir": "1, 0",
          "config": "'sum, 'LA':AskProcess <- 'zero.AskProcess ; 'Lp':List`{Process`} <- 'nil.List`{Process`} ; 'P:Process <- 'tell[''c.Sort] ; 'c:Constraint <- ''d.Sort"
        }
      ]
      let configResult = "c**tell('b)**c && c**(ask 'd then tell('c))**c ; 'd"
      const functionResult = configVisuHelper.getConfigVisualization(process, constraints, redex)
      expect(functionResult).be.equal(configResult)

      done()

    })

    it(`Config Visualization helper:  Tell and many Asks`, done => {
      let process = "tell('b) && ask 'd then tell('c) && ask 'a then tell('g) && ask 'd then tell('h)"
      let constraints = "'d"
      let redex = 
      [
        {
          "ir": "0, None",
          "config": "'tell, 'Lp':List`{Process`} <- '_&&_[('ask_then_[''d.Sort C ('tell[    ''c.Sort])]) C ('ask_then_[''a.Sort C ('tell[''g.Sort])]) C ('ask_then_[    ''d.Sort C ('tell[''h.Sort])])] ; 'c:Constraint <- ''b.Sort "
        },
        {
          "ir": "1, 0",
          "config": "'sum, 'LA':AskProcess <- 'zero.AskProcess ; 'Lp':List`{Process`} <- '_&&_[('ask_then_[''a.Sort C ('tell[    ''g.Sort])]) C ('ask_then_[''d.Sort C ('tell[''h.Sort])])] ; 'P:Process <- 'tell[''c.Sort] ; 'c:Constraint <- ''d.Sort "
        },
        {
          "ir": "3, 0",
          "config": "'sum, 'LA':AskProcess <- 'zero.AskProcess ; 'Lp':List`{Process`} <- 'nil.List`{Process`} ; 'P:Process <- 'tell[''h.Sort] ; 'c:Constraint <- ''d.Sort"
        }
      ]
      let configResult = "c**tell('b)**c && c**ask 'd then tell('c)**c &&  ask 'a then tell('g)  && c**ask 'd then tell('h)**c ; 'd"
      const functionResult = configVisuHelper.getConfigVisualization(process, constraints, redex)
      expect(functionResult).be.equal(configResult)

      done()

    })

    it(`Config Visualization helper:  sum`, done => {
      let process = "(ask 'd then tell('c) + ask 'a then tell( 'g) + ask 'd then tell('h)) && tell('a)"
      let constraints = "'d"
      let redex = 
      [
        {
          "ir": "0, 0",
          "config": "'sum, 'LA':AskProcess <- '_+_[('ask_then_[''a.Sort C ('tell[''g.Sort])]) C (    'ask_then_[''d.Sort C ('tell[''h.Sort])])] ; 'Lp':List`{Process`} <- 'tell[''a.Sort] ; 'P:Process <- 'tell[''c.Sort] ; 'c:Constraint <- ''d.Sort "
        },
        {
          "ir": "0, 2",
          "config": "'sum, 'LA':AskProcess <- 'zero.AskProcess ; 'Lp':List`{Process`} <- 'tell[''a.Sort] ; 'P:Process <- 'tell[''h.Sort] ; 'c:Constraint <- ''d.Sort "
        },
        {
          "ir": "1, None",
          "config": "'tell, 'Lp':List`{Process`} <- 'nil.List`{Process`} ; 'c:Constraint <- ''a.Sort"
        }
      ]
      let configResult = "(c**ask 'd then tell('c)**c +  ask 'a then tell( 'g)  + c**ask 'd then tell('h)**c) && c**tell('a)**c ; 'd"
      const functionResult = configVisuHelper.getConfigVisualization(process, constraints, redex)
      expect(functionResult).be.equal(configResult)

      done()

    })


})
    
