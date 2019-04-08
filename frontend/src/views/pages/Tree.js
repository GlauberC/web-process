import React, {Component} from 'react'

export default class Tree extends Component {
    render(){
        return(
            <div>
                <h1>{this.props.initialconfig}</h1>
            </div>
        )
    }
}