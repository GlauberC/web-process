import React, {Component} from 'react'
import ErrorMsg from '../components/ErrorMsg'
import './css/confinit.css'

export default class ConfigInit extends Component{
    constructor(){
        super()
        this.parseConfig = this.parseConfig.bind(this)
        this.state = {
            error: ''
        }
    }
    componentDidMount(){
        this.textInput = document.querySelector('.textInput')
        this.inputDefinitions = document.querySelector('.definitionsInput')
        this.inputProcess = document.querySelector('.processInput')
        this.inputConstraints = document.querySelector('.constraintsInput')
    }
    parseConfig(e){
        
        let args = this.textInput.value.split(';')
        if(args[0] === undefined || args[1] === undefined || args[2] === undefined){
            e.preventDefault()
            this.setState({error: "Invalid Config"})
        }else{
            console.log()
            this.setState({error: ""})
            this.inputDefinitions.value = args[0]
            this.inputProcess.value = args[1]
            this.inputConstraints.value = args[2]
        }

    }
    render(){

        let errorShow = this.state.error === '' ? null : <ErrorMsg error = {this.state.error}/>

        return(
        <div className = "mt-4">
            <div className="form-group mt-4">
                <form>
                    {errorShow}
                    <label for="input">New Config:</label>
                    <textarea className="form-control textInput" rows="5" id="comment" placeholder = "Definition ; Process ; Constraints"></textarea>
                    <p className = "text-secondary">{`Tips: def( 'defname, tell('a) ) ; tell( 'a ) || tell( 'b ) ; 'c `}</p>
                    <input hidden className="definitionsInput" name = "definitions"/>
                    <input hidden className="processInput" name = "process"/>
                    <input hidden className="constraintsInput" name = "constraints"/>
                    <button onClick = {this.parseConfig} className = "btn btn-primary mt-4">Parse Config</button>
                    <button className = "btn btn-success mt-4">Create Config</button>
                </form>
            </div>
    
        </div>
        )
    }
}