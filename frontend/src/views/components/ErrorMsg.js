import React, {Component} from 'react'
export default class ErrorMsg extends Component {
    render(){
        return(
            <div className="alert alert-danger mt-2">{this.props.error}</div>
        )
    }
}