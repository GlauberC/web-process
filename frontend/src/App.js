import React, { Component } from 'react';
import { Switch, Route }from 'react-router-dom'
import Navbar from './views/components/Navbar'

import ConfigInit from './views/pages/ConfigInit'
import Tree from './views/pages/Tree'
import PubSub from 'pubsub-js';


class App extends Component {
  constructor(){
    super()
    this.createNewConfig = this.createNewConfig.bind(this)
    this.state = {
      initialConfig : ''
    }
  }
  componentDidMount(){
    PubSub.subscribe('metaRed', (err, config) => {	
      this.setState({initialConfig: `< ${config.definitions} ; ${config.process} ; ${config.constraints} >`})
    })
  }
  componentDidUpdate(){
    console.log(this.state.initialConfig)
  }
  createNewConfig(){
    document.querySelector('.createConfig').click()
  }
  render() {
    let createNewConfigButton = <button 
        onClick = {this.createNewConfig}
        className = "btn btn-primary mt-4" >
        create a new config
        </button>

    return (
      
      <div>
      <header>
        <Navbar />
      </header>

     
        <main className = 'container'>
        
            <Switch>
              <Route path = "/configinit" component = {ConfigInit} />
              <Route>{this.state.initialConfig === '' ?  createNewConfigButton : <Tree initialconfig = {this.state.initialConfig}/>}</Route>
            </Switch>
          
        </main>
      
      
      </div>     
    )
  }
}

export default App;
