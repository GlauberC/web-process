import React from 'react'

export default () => (
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
            <li className="nav-item">
                <a className="nav-link" href = "#/tree">Tree</a>
            </li>
            </ul>
        </div>
    </nav>
)