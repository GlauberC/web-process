import React, { Component } from 'react';
import { Switch, Route }from 'react-router-dom'
import Navbar from './views/components/Navbar'

import ConfigInit from './views/pages/ConfigInit'
import Tree from './views/pages/Tree'



class App extends Component {
  render() {
    return (
      
      <div>
      <header>
        <Navbar />
      </header>

     
        <main className = 'container'>
        
            <Switch>
              <Route exact path = "/" component = {ConfigInit} />
              <Route path = "/tree" component = {Tree} />
            </Switch>
          
        </main>
      
      
      </div>     
    )
  }
}

export default App;
