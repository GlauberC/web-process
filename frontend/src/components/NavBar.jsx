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
                    

                    <h3>Constraints:</h3>
                    <ul>
                        <li>{`True: True`}</li>
                        <li>{`Atomic constraint: 'a, 'b, 'c, etc`}</li>
                        <li>{`Conjunction:   C /\\ C`}</li>
                    </ul>


                    <h3>Processes:</h3>
                    <ul>
                        <li>{`Nil Process:   skip`}</li>
                        <li>{`Parallel:   C || C`}</li>
                        <li>{`tell process: tell(C) `}</li>
                        <li>{`ask process: ask(C) then (P) `}</li>
                        <li>{`lask process: lask(C) then (P) `}</li>
                        <li>{`call process: call(D) `}</li>
                    </ul>
                    <h3>Definitions:</h3>
                    <ul>
                        <li>{`Declaration:   name, P`}</li>
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
                    <div className = 'container'>     
                        <p>Concurrent Constraint Programming (CCP) is a model of concurrency based upon the shared-variables communication model. Agents in CCP interact by posting (tell) and querying (ask) constrains on a common store of partial information. </p>

                        <p>This tool offers the possibility of writing CCP programs and observing the resulting behavior. We have provided the constructs that are common to all CCP language, namely, tell, ask, parallel composition and recursion. Moreover, it is also possible to specify non-deterministic behavior (guarded summation) and linear asks that may consume information from the store.</p>

                        <br/>
                        <h4>Authors:</h4>  
                        <p>Web interface: Glauber Carvalho. </p>



                        <p>
                            <b>Authors &#8678; Subtitle</b>
                            <br/> Web interface:
                            <a href="https://github.com/GlauberC">Glauber Carvalho.</a>
                            <br/>
                            <a href="https://sites.google.com/site/carlosolarte/">Carlos Olarte. </a>
                            <br/>
                            <br/>
                            <b>Contact &#8678; Subtitle</b>
                            <br/>
                            <a href="https://sites.google.com/site/carlosolarte/">Carlos Olarte </a>
                        </p>
                    </div>

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