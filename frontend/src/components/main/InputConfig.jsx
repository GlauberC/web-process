import React, {Component} from 'react'
import pubSub from 'pubsub-js'
import Definition from '../Definition'
import './css/inputConfig.css'

export default class InputConfig extends Component{
    constructor(){
        super()
        this.state = {
            numDefinitions: 0
        }
    }

    errorSuccessPublish = (errorMsg, successMsg='') => {
        pubSub.publish('errorMsg', errorMsg)
        pubSub.publish('successMsg', successMsg)
        pubSub.publish('loading', false)
    }

    getData = () => {
        this.errorSuccessPublish('')
        pubSub.publish('loading', true)
        const input = document.querySelector('.textInput').value
        if (input === ''){
            this.errorSuccessPublish('Invalid Config')
            return undefined // Use in parse
        }
        const inputDPC = input.split(';')
        if(!inputDPC[0] || !inputDPC[1] || inputDPC[2] ){
            this.errorSuccessPublish('Expected 2 args: process ; constraints')
            return undefined // Use in parse
        }
        let def = ''

        let allDefDiv = document.querySelectorAll('.defition')
        if(allDefDiv.length === 0){
            def = 'empty'
        }else{
            allDefDiv.forEach(divDef => {
                if(divDef.querySelector('.input-definition').value.replace(/\s/ig, '').length === 0){
                    def += ''
                }
                else if(def.length < 5){
                    def = 'def(' + divDef.querySelector('.input-definition').value.trim() + ')'
                }else{
                    def = def + ', def(' + divDef.querySelector('.input-definition').value.trim() + ')'
                }
            })           
            if(def.length < 5){
                def = 'empty'
            }
        }
        return { // Use in parse
            definitions: def,
            process: inputDPC[0].trim().replace(/\n/, ''),
            constraints: inputDPC[1].trim().replace(/\n/, '')
        }
    }
    
    parse = async () => {
        const config = this.getData()
        
        if (config){
            const options = {
                method: 'POST',
                body: JSON.stringify(config),
                headers: new Headers({
                    'Content-Type' : 'application/json'
                })
            }
            try{
                const response = await fetch('http://localhost:3001/maude/parse', options)
                if(await response.status === 200){
                    this.errorSuccessPublish('' , 'The configuration is well formed')
                    return config   // Use in createConfig
                }else{
                    this.errorSuccessPublish('There was an error in configuration')
                    return false // Use in createConfig
                }
            }catch(err) {
                this.errorSuccessPublish('There was an internal error')
                return false // Use in createConfig
            }
        }else{
            return false // Use in createConfig
        }
    }

    metaRequest = async (config) => {
        pubSub.publish('loading', true)
        const options = {
            method: 'POST',
            body: JSON.stringify(config),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }
        try {
            const response = await fetch('http://localhost:3001/maude', options)
            if(await response.status === 200){
                response.json().then( (res) => {
                    pubSub.publish('metaRed', res)
                    setTimeout(() => {
                        this.errorSuccessPublish('', '')
                        return this.props.history.push('/tree')
                    } , 200)
                })
            }else{
                this.errorSuccessPublish('There was an internal error')
            }
        } catch(err){
            this.errorSuccessPublish('There was an internal error')
        }
    }

    createConfig = async () => {
        try{
            this.parse().then((resolve) => {
                if(resolve){
                    this.metaRequest(resolve)
                }
            })
        }catch(err){
            this.errorSuccessPublish('There was an internal error')
        }
    }
    removeDefinition = () => {
        this.setState({numDefinitions: this.state.numDefinitions - 1})
    }
    arrNumber = n => {
        let arr = []
        for(let i = 0; i<n; i++){
            arr.push(i)
        }
        return arr
    }
    addDefinition = () => {
        this.setState({numDefinitions: this.state.numDefinitions + 1})
    }

    render(){
        return (
        <div className = "mt-4">
            <div className="form-group mt-4">
                <h2>New Config:</h2>
                <textarea className="form-control textInput" rows="5" id="comment" placeholder = "Process ; Store"></textarea>
                <p className = "text-secondary">{`Tips: call('defname) || tell( 'b ) || (( ask 'c then tell ('d) ) + ( ask 'c then tell ('e)) + ( ask 'b then tell ('e))  )  ; 'c `}</p>
                <hr/>
                <h2>Definitions:</h2>
                <div className = "definitionsList">
                    {this.arrNumber(this.state.numDefinitions).map(key => <Definition key = {key} value = {key}/>)}
                    {this.state.numDefinitions === 0 ? '' : <p className = "offset-md-2 mt-2 text-secondary">{`Tips: 'defname, tell('a)`}</p>}
                    <div className = 'row offset-md-1'>
                        <button onClick = {this.addDefinition} className = "btn btn-primary round-button">Add</button>
                        {this.state.numDefinitions === 0 ? '' : <button onClick = {this.removeDefinition} className = "btn btn-danger round-button right-button">Remove</button>}
                    </div>
                </div>
                <hr/>
                <button onClick = {this.parse} className = "btn btn-primary mt-4">Parse Config</button>
                <button onClick = {this.createConfig} className = "btn btn-success mt-4 right-button">Create Config</button>
                <hr/>
                <h2>Examples:</h2>
                <button onClick = {() => this.examples(0)} className = "btn btn-secondary mt-4">3 dining philosophers </button>

            </div>
        </div>
        )
    }

    examples = async n => {
        if (n === 0){
            await this.setState({numDefinitions: 9})
            let defs = document.querySelectorAll('.input-definition')
            document.querySelector('.textInput').value = "tell('f0) || tell('f1)  || tell('f2) || call('P0) || call('P1) || call('P2) ; empty"
            defs[0].value = "'P0,  lask ('f0 ^ 'f1) then call('P0E)"
            defs[1].value = "'P0E, lask ('eat0) then call('P0R) || tell('eat0)"
            defs[2].value = "'P0R, tell('f0) || tell('f1) || call('P0)"
            defs[3].value = "'P1,  lask ('f1 ^ 'f2) then call('P1E)"
            defs[4].value = "'P1E, lask ('eat1) then call('P1R) || tell('eat1)"
            defs[5].value = "'P1R, tell('f1) || tell('f2) || call('P1)"
            defs[6].value = "'P2,  lask ('f2 ^ 'f0) then call('P2E)"
            defs[7].value = "'P2E, lask ('eat2) then call('P2R) || tell('eat2)"
            defs[8].value = "'P2R, tell('f2) || tell('f0) || call('P2)"
        }
        
        
    }
}
