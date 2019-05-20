import React, {Component} from 'react'
import {HashRouter} from 'react-router-dom'
import pubSub from 'pubsub-js'

import Routes from './Routes'
import ErrorMsg from '../logMsg/ErrorMsg'
import SuccessMsg from '../logMsg/SuccessMsg';


export default class Main extends Component{
    constructor(){
        super()
        this.state = {
            errorMsg: '',
            successMsg: '',
            initialConfig: {
                definitions: '',
                process: '',
                constraints: ''
            }
        }
    }
    componentDidMount(){
        pubSub.subscribe('metaRed', (err, config) => {	
            this.setState({initialConfig: `< ${config.definitions} ; ${config.process} ; ${config.constraints} >`})
        })
        pubSub.subscribe('errorMsg', (err, errorMsg) => {	
            this.setState({errorMsg: errorMsg})
        })
        pubSub.subscribe('successMsg', (err, successMsg) => {	
            this.setState({successMsg: successMsg})
        })
        pubSub.subscribe('metaRed', (err, res) => {	
            this.setState({initialConfig: {definitions: res.definitions,
                process: res.process,
                constraints: res.constraints,
                configVisualization: res.configVisualization,
                clickableProcessIndex: res.clickableProcessIndex}})
        })
    }

    errorDiv = msg => {
        if(msg === ''){
            return null
        }else{
            return <ErrorMsg errormsg = {this.state.errorMsg}/>
        }
    }
    successDiv = msg => {
        if(msg === ''){
            return null
        }else{
            return <SuccessMsg successmsg = {this.state.successMsg}/>
        }
    }

    render(){
        return(
            <div>
                {this.errorDiv(this.state.errorMsg)}
                {this.successDiv(this.state.successMsg)}
                <div className = "container">
                    <HashRouter>
                        <Routes initialConfig = {this.state.initialConfig}/>
                    </HashRouter>
                </div>
            </div>
        )
    }
}