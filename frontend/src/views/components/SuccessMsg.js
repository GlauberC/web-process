import React, {Component} from 'react'
export default class ErrorMsg extends Component {
    render(){
        return(
            <div className="alert alert-success mt-2">{this.props.msg}</div>
        )
    }
}