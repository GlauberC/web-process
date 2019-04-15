import React, {Component} from 'react'
import pubSub from 'pubsub-js'
export default class Tree extends Component{
    constructor(props){
        super()
        this.props = props
    }
    componentDidMount(){
        this.errorSuccessPublish('','')
    }

    errorSuccessPublish = (errorMsg, successMsg='') => {
        pubSub.publish('errorMsg', errorMsg)
        pubSub.publish('successMsg', successMsg)
    }

    render(){
        return(
            <h1>{`< ${this.props.initialConfig.definitions} ; ${this.props.initialConfig.process} ; ${this.props.initialConfig.constraints} >`}</h1>
        )
    }
}