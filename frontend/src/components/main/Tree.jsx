import React, {Component} from 'react'
// import pubSub from 'pubsub-js'
import 'react-tree-graph/dist/style.css'
import TreeGraph from 'react-tree-graph';
import tippy from 'tippy.js'

import './css/tree.css'
export default class Tree extends Component{
    constructor(props){
        super()
        this.props = props
        this.name = `< ${this.props.initialConfig.definitions} ; ${this.props.initialConfig.process} ; ${this.props.initialConfig.constraints} >`
        this.state = {
            run: 0,
            treeData: this.branchFactory('x', this.name, '0')
        }    
    }

    branchFactory = (parent,  content, name = '') => {
        let newObj = {
            name: name,
            parent: parent,
            content: content,
            children: []
        }
        return newObj
    }

    findB = (name, tree) => {
        // Turn into promise
        if(name === tree.name){
            return tree
        }else{
            if(tree.children.length > 0){
                return this.findB(name , tree.children.filter((b) => 
                    name.startsWith(b.name)
                )[0])
            }
        }
    }

    addB = (branch, tree) => {
        // Turn into promise
        let parentBranch = this.findB(branch.parent, tree)
        if(parentBranch.children.length === 0){
            branch.name = parentBranch.name + '.0'
            parentBranch.children.push(branch)
            return tree
        }else{
            if(parentBranch.children.filter(b => branch.content === b.content).length > 0){
                return tree
            }else{
                branch.name = parentBranch.name + '.' + parentBranch.children.length
                parentBranch.children.push(branch)
                return tree
            }
        }
    }

    test = () => {
        // Delete after testing
        let tree = this.state.treeData
        let branch2 = this.branchFactory('0', 'Conteudo2')
        let branch3 = this.branchFactory('0', 'Conteudo3')
        let branch4 = this.branchFactory('0', 'Conteudo4')
        let branch5 = this.branchFactory('0.0', 'Conteudo5')
        let branch6 = this.branchFactory('0.1', 'Conteudo6')
        let branch7 = this.branchFactory('0.1', 'Conteudo7')
        let branch8 = this.branchFactory('0.0.0', 'Conteudo8')
        let branch9 = this.branchFactory('0.0.0.0', 'Conteudo9')
        let branch10 = this.branchFactory('0.0.0.0.0', 'Conteudo10')
        let branch11 = this.branchFactory('0.0.0.0', 'Conteudo11')
        let branch12 = this.branchFactory('0.0.0.0', 'Conteudo12')
        let branch13 = this.branchFactory('0.0.0.0', 'Conteudo13')
        let branch14 = this.branchFactory('0.0.0.0.0', 'Conteudo14')
        tree = this.addB(branch2, tree)
        tree = this.addB(branch3, tree)
        tree = this.addB(branch4, tree)
        tree = this.addB(branch5, tree)
        tree = this.addB(branch6, tree)
        tree = this.addB(branch7, tree)
        tree = this.addB(branch8, tree)
        tree = this.addB(branch9, tree)
        tree = this.addB(branch10, tree)
        tree = this.addB(branch11, tree)
        tree = this.addB(branch12, tree)
        tree = this.addB(branch13, tree)
        tree = this.addB(branch14, tree)
        this.setState({treeData: tree, run: this.state.run + 1})

    }
    handleNode = (event, nodeKey) => {
        let node = event.target.parentNode
        node.setAttribute("data-tippy-content", `<a class="btn" onClick="test('${nodeKey}')">${nodeKey}</a>`)
        tippy(node, {           
            trigger: 'click',
            interactive: true
        })
    }
    inputHandle = (e) => {
        console.log(e.target.value)
        console.log(this.findB(e.target.value, this.state.treeData))
    }

    render(){


        return(
            
             <div className = 'treeSvg'>
                <input onFocus = {this.inputHandle} className = "testInput invisible"/>
                <button onClick = {this.test} className= "btn btn-info">Test</button>
                <h2 className = "mt-4">Tree View:</h2>
                <TreeGraph
                    key = {this.state.run} 
                    data={this.state.treeData}
                    gProps={{
                        onClick: this.handleNode,
                        className: 'node'
                    }}
                    height={800}
                    width={800}
                />;
            </div>
            
        )
    }
}