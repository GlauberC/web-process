import React, {Component} from 'react'
import './css/navbar.css'
export default class NavBar extends Component{
    render(){
        return(
        <div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href='#' >Process Simulator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href='#/config'>Create config</a>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto navbar-right">
                    <li className="nav-item">
                        <a className="nav-link fake-link" data-toggle="modal" data-target="#syntaxtModal" >Syntax</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fake-link" data-toggle="modal" data-target="#aboutModal" >About</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="modal" id="syntaxtModal">
            <div className="modal-dialog">
                <div className="modal-content">

                
                <div className="modal-header">
                    <h4 className="modal-title">Syntax</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    

                    <h2>Constraints:</h2>
                    <ul>
                        <li>{`True   | True`}</li>
                        <li>{`Atomic constraint   | 'a, 'b, 'c, etc`}</li>
                        <li>{`Conjunction |   C /\\ C`}</li>
                    </ul>


                    <h2>Processes:</h2>
                    <ul>
                        <li>{`Nil Process  |   skip`}</li>
                        <li>{`tell process | tell(C) `}</li>
                        <li>{`Conjunction |   C /\\ C`}</li>
                    </ul>
                    <h2>Definitions:</h2>
                    <ul>
                        <li>{`declaration |  name = P`}</li>
                    </ul>

                    
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div>
        <div className="modal" id="aboutModal">
            <div className="modal-dialog">
                <div className="modal-content">

                
                <div className="modal-header">
                    <h4 className="modal-title">About</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    About...
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div>

        </div>
        )

    }
}