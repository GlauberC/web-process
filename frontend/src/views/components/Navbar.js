import React, {Component} from 'react'
import { Link }from 'react-router-dom'

export default class Tree extends Component {
    render(){
        return(
       

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to = "/">Process Simulator</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item {{activeConfigPage}}">
                        <Link className="nav-link" to = "/">New Config</Link>
                    </li>

                </ul>
            </div>
        </nav>

        )
    }
}