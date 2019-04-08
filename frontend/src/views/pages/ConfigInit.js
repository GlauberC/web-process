import React, {Component} from 'react'
import ErrorMsg from '../components/ErrorMsg'
import SuccessMsg from '../components/SuccessMsg'
import './css/confinit.css'
import PubSub from 'pubsub-js';

export default class ConfigInit extends Component{
    constructor(){
        super()
        this.parseConfig = this.parseConfig.bind(this)
        this.parseRequest = this.parseRequest.bind(this)
        this.createConfig = this.createConfig.bind(this)
        this.metaRedRequest = this.metaRedRequest.bind(this)

        this.state = {
            error: '',
            success: ''
        }
    }
    componentDidMount(){
        this.textInput = document.querySelector('.textInput')
    }
    getData(){
        return new Promise((resolve, reject) => {
            let args = this.textInput.value.split(';')
            if(args[0] === undefined || args[1] === undefined || args[2] === undefined || args[3] !== undefined){
                this.setState({error: "Invalid Config", success: ""})
                reject('Invalid Config')
            }else{
                this.setState({error: "", success: ""})
                this.input = {
                    definitions: args[0].trim(),
                    process: args[1].trim(),
                    constaints: args[2].trim(),
                }
                resolve('')
            }
        })
        
    }
    parseConfig(){
        this.getData().then( () => {
            this.parseRequest()
        })
    }

    async parseRequest(){
        const options = {
            method: 'POST',
            body: JSON.stringify(this.input),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }
        try{
            this.setState({error: "", success: ""})
            const response = await fetch('http://localhost:3001/maude/parse', options)
            if(await response.status === 200){
                this.setState({success: "The configuration is well formed", error: ""})
            }else{
                this.setState({error: " There was an error in configuration", success: ""})
            }
        }catch(err) {
            console.log("ERROR: "+ err)
        }
    }

    async metaRedRequest(){
        const options = {
            method: 'POST',
            body: JSON.stringify(this.input),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }
        try{
            const response = await fetch('http://localhost:3001/maude', options)
            if(await response.status === 200){
                response.json().then( (res) => {
                    PubSub.publish('metaRed', res);
                    return this.props.history.push('/tree')
                })
            }else{
                this.setState({error: " There was an internal error", success: ""})
            }
        }catch(err) {
            console.log("ERROR: "+ err)
        }
    }

    async createConfig(){
        this.getData().then( () => {
            this.parseRequest().then(() => {
                if(this.state.error === ''){
                    this.metaRedRequest();
                }
            })
        })
    }
    
    render(){

        let errorShow = this.state.error === '' ? null : <ErrorMsg error = {this.state.error}/>
        let successShow = this.state.success === '' ? null : <SuccessMsg msg = {this.state.success}/>

        return(
        <div className = "mt-4">
            <div className="form-group mt-4">
                {errorShow}
                {successShow}
                <label htmlFor="input">New Config:</label>
                <textarea className="form-control textInput" rows="5" id="comment" placeholder = "Definition ; Process ; Constraints"></textarea>
                <p className = "text-secondary">{`Tips: def( 'defname, tell('a) ) ; tell( 'a ) || tell( 'b ) ; 'c `}</p>
                <button onClick = {this.parseConfig} className = "btn btn-primary mt-4">Parse Config</button>
                <button onClick = {this.createConfig} className = "btn btn-success mt-4">Create Config</button>
            </div>
    
        </div>
        )
    }
}