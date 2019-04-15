import React from 'react'
import {Switch, Route, Redirect } from 'react-router'

import InputConfig from './InputConfig'
import Tree from './Tree'

export default props => (

    
    <Switch>
        <Route path='/config' component = {InputConfig} />
        {/* <Route path='/tree' component = {Tree} /> */}
        {props.initialConfig.process !== '' ?
            <Route path='/tree' component = {() => 
            <Tree initialConfig = {props.initialConfig} />
            } /> :
            <Redirect from='*' to='/config'/> }
        <Redirect from='*' to='/config' />
    </Switch>

    
    
)