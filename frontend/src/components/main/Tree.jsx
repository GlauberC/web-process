import React, {Component} from 'react'
import 'react-tree-graph/dist/style.css'
import TreeGraph from 'react-tree-graph';
import tippy from 'tippy.js'
import ReactLoading from 'react-loading'

import './css/tree.css'
export default class Tree extends Component{
    constructor(props){
        super()
        this.props = props
        this.config = `${this.props.initialConfig.definitions} ; ${this.props.initialConfig.process} ; ${this.props.initialConfig.constraints}`
        this.state = {
            run: 0,
            errorMsg: '',
            successMsg: '',
            treeData: '',
            loading: false
            
        }   
    }
    componentWillMount(){
        let firstBranch = this.branchFactory('x',
                this.config,
                this.props.initialConfig.configVisualization,
                this.props.initialConfig.clickableProcessIndex,
                '0')
        this.setState({treeData: firstBranch})

    }

    branchFactory = (parent, config, content, clickableProcessIndex, name = '') => {
        let newObj = {
            name: name,
            parent: parent,
            content: content,
            config: config,
            clickableProcessIndex: clickableProcessIndex,
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
        let parentBranch = this.findB(branch.parent, tree)
        if(parentBranch.children.length === 0){
            branch.name = parentBranch.name + '.0'
            parentBranch.children.push(branch)
            return tree
        }else{
            if(parentBranch.children.filter(b => branch.config === b.config).length > 0){
                return tree
            }else{
                branch.name = parentBranch.name + '.' + parentBranch.children.length
                parentBranch.children.push(branch)
                return tree
            }
        }
    }
    isSon = (branch, config) => {
        let bool = false
        if(branch.children.length !== 0){
            branch.children.forEach(b => {
                if(b.config === config){
                    bool = true
                }
            })
        }
        return bool
    }

    handleNode = (event, nodeKey) => {
        // VER MUDANÇA DE COR AQUI
        let node = event.target.parentNode
        let branch = this.findB(nodeKey, this.state.treeData)
        let showConfig = branch.content.replace(/c\*\*/ig, "<a style='color: PaleTurquoise;' class='process-clickable' onClick = getKey(__;; >").replace(/cd\*\*/ig, ";;<a style='color: #FA5858'>").replace(/\*\*c/ig,"</a>")
        let arrShowConfig = []
        showConfig.split(';;').forEach((p, index)=> {
            arrShowConfig.push(p.replace('__', `'${nodeKey}',` + index + ')'))
        })
        showConfig = arrShowConfig.join('')
        node.setAttribute("data-tippy-content", `${showConfig}`)
        tippy(node, {           
            trigger: 'mouseenter click',
            animation: 'fade',
            interactive: true
            
        })
    }
    inputHandle = (e, nodeKey) => {
        let targetArr = e.target.value.split('__')
        let targetName = targetArr[0]
        let indexClickable = targetArr[1]
        let branch = this.findB(targetName, this.state.treeData)

        this.metaApp(branch, branch.clickableProcessIndex[indexClickable])
    }

    metaApp = async (branch, index) => {
        this.setState({errorMsg: '', successMsg: '', loading: true})
        const options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }
        try {
            const response = await fetch(`http://localhost:3001/maude/${branch.config}/${index}`, options)
            if(await response.status === 200){
                response.json().then( (res) => {
                    let treeData = this.state.treeData
                    let newConfig = `${res.definitions} ; ${res.process} ; ${res.constraints}` 
                    if(this.isSon(branch, newConfig)){
                        this.setState({errorMsg: 'This process was already executed', successMsg: '', loading: false})
                    }else{
                        branch.content = this.clickToClickedProcess( branch, index)
                        let newBranch = this.branchFactory( branch.name,
                            newConfig,
                            res.configVisualization,
                            res.clickableProcessIndex)
                        treeData = this.addB(newBranch, treeData)
                        this.setState({run: this.state.run + 1,
                             treeData: treeData,
                             errorMsg: '',
                             successMsg: 'A new branch was created',
                             loading: false})
                    }

                })
            }else{
                this.setState({errorMsg: 'There was an internal error', successMsg: '', loading: false})
            }
        } catch(err){
            this.setState({errorMsg: 'There was an internal error', successMsg: '', loading: false})
        }
    }
    clickToClickedProcess = (branch, index) => {
        let newContents = []
        let iterator = -1 // -1 to fix first index with c**
        branch.content.split(/c\*\*/).forEach(piece => {
            if(branch.clickableProcessIndex.indexOf(index) === iterator){
                piece = "cd**" + piece
            }else{
                piece = "c**" + piece
                iterator++
            }
            if(/cd\*\*/ig.test(piece)){
                let numberCd = piece.split(/cd\*\*/ig).length
                iterator +=  numberCd - 1
            }
            newContents.push(piece)    
        })
        newContents[0] = newContents[0].replace(/c\*\*/ig, '')
        return newContents.join('')
    }

    render(){
        let errorMsg = this.state.errorMsg === '' ? '' : <div className = "alert alert-danger"><p>{this.state.errorMsg}</p></div>
        let successMsg = this.state.successMsg === '' ? '' : <div className = "alert alert-success"><p>{this.state.successMsg}</p></div>
        let loading = this.state.loading ? <ReactLoading type="spokes" color='#000000' height ='5%' width = '5%' className = 'loading' /> : ''
        return(
            <div>
                {loading}
                {errorMsg}
                {successMsg}

                <div className = 'treeSvg'>
                    <input onFocus = {this.inputHandle} className = "inviInput invisible"/>
                    <h2 className = "mt-4">Tree View:</h2>
                    <TreeGraph
                        key = {this.state.run} 
                        data={this.state.treeData}
                        gProps={{
                            onMouseOver: this.handleNode,
                            className: 'node'
                        }}
                        height={800}
                        width={800}
                        />;
                </div>
            </div>
            
        )
    }
}