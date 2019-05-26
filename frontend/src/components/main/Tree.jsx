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
            loading: false,
            radioExpand: 0,
            expansionSize: 1
            
        }   
    }
    componentWillMount(){
        let firstBranch = this.branchFactory('x',
                this.config,
                this.props.initialConfig.configVisualization,
                this.props.initialConfig.clickableProcessIndex,
                'x',
                '0')
        this.setState({treeData: firstBranch})

    }

    branchFactory = (parent, config, content, clickableProcessIndex, from = '', name = '') => {
        let newObj = {
            name: name,
            parent: parent,
            from: from,
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
        let from = branch.from === 'x' ? '' : `<span class = "small"><br>Generator process: ${branch.from}</span>`
        let showConfig = '<p>' + branch.content.replace(/c\*\*/ig, "<a style='color: PaleTurquoise;' class='process-clickable' onClick = getKey(__;; >").replace(/cd\*\*/ig, "<a style='color: #FA5858'>").replace(/\*\*c/ig,"</a>") + "<br/><br/><a onClick=expand('"+ nodeKey +"') class = 'btn btn-sm btn-primary'>Expand</a>"+ from + "</p>"
        let arrShowConfig = []
        showConfig.split(';;').forEach((p, index)=> {
            arrShowConfig.push(p.replace('__', `'${nodeKey}',` + index + ')'))
        })
        showConfig = arrShowConfig.join('').replace(/&&/ig, '||')
        node.setAttribute("data-tippy-content", `${showConfig}`)
        tippy(node, {           
            trigger: 'mouseenter',
            animation: 'fade',
            interactive: true
            
        })
    }
    inputHandle = (e) => {
        tippy.hideAll()
        if(/expand\(.+\)/ig.test(e.target.value)){

            let name = e.target.value.replace('expand(', '').replace(')', '')
            let branch = this.findB(name, this.state.treeData)
            this.expand(branch)

        }else{
            let targetArr = e.target.value.split('__')
            let targetName = targetArr[0]
            let indexClickable = targetArr[1]
            let branch = this.findB(targetName, this.state.treeData)

            this.metaApp(branch, branch.clickableProcessIndex[indexClickable])
        }
        
    }

    metaApp = async (branch, index) => {
        this.setState({errorMsg: '', successMsg: '', loading: true})
        try {
            await this.metaAppFetch(branch, index)
            if(this.state.errorMsg === ""){
                this.setState({
                    errorMsg: '',
                    successMsg: 'A new branch was created',
                    loading: false})
            }else{
                this.setState({loading: false})
            }
            
        } catch(err){
            this.setState({errorMsg: 'There was an internal error', successMsg: '', loading: false})
        }

    }
    metaAppFetch = async (branch, index) => {
        const options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }
        const response = await fetch(`http://localhost:3001/maude/${branch.config}/${index}`, options)
        if(await response.status === 200){
            response.json().then( (res) => {

                let treeData = this.state.treeData
                let newConfig = `${res.definitions} ; ${res.process} ; ${res.constraints}` 
                if(this.isSon(branch, newConfig)){
                    if(branch.clickableProcessIndex.indexOf(index) !== -1 ){
                        this.setState({errorMsg: 'Duplicate configuration. Another process has already generated this configuration', successMsg: ''})
                        branch.content = this.clickToClickedProcess( branch, index)
                    }else{
                        this.setState({errorMsg: 'This process was already executed', successMsg: ''})
                    }
                }else{
                    branch.content = this.clickToClickedProcess( branch, index)
                    var newBranch = this.branchFactory( branch.name,
                        newConfig,
                        res.configVisualization,
                        res.clickableProcessIndex,
                        res.from)
                    
                    this.addB(newBranch, treeData)
                }
                this.setState({run: this.state.run + 1,
                    treeData: treeData})
                
            })
        }else{
            this.setState({errorMsg: 'There was an internal error', successMsg: '', loading: false})
        }
    }

    expand = branch =>{
        // mode:
        // 0 => first
        // 1 => random

        if(this.state.radioExpand === 0){
            this.expandVertical(branch)
        }else if(this.state.radioExpand === 1){
            this.expandHorizontal(branch, 0)
        }else{
            this.expandHorizontal(branch, 1)
        }
    }

    expandVertical =  async branch => {
        this.setState({errorMsg: '', successMsg: '', loading: true})
        let finalIndex = branch.clickableProcessIndex.length
        if(branch.clickableProcessIndex.length === 0){
            this.setState({
                errorMsg: 'Every process was already executed',
                successMsg: '',
                loading: false})
        }else{
            branch.clickableProcessIndex.forEach( async (i, term) => {
                try {
                    await this.metaAppFetch(branch, i)
                    if(term === finalIndex - 1){
                        this.setState({
                            errorMsg: '',
                            successMsg: 'A vertical expansion was executed',
                            loading: false})
                    }
                 
                } catch(err){
                    this.setState({errorMsg: 'There was an internal error', successMsg: '', loading: false})
                }
                
            })
        }        
    }
    expandHorizontal =  async (branch, mode) => {
        let i = 0
        if(branch.clickableProcessIndex.length === 0){
            this.setState({
                errorMsg: 'Every process was already executed',
                successMsg: '',
                loading: false})
        }
        else{
            this.setState({errorMsg: '', successMsg: '', loading: true})
            let iterationBranch = branch
            for(i; i <= this.state.expansionSize - 1; i++){
                let index = 0
                try{
                    if(iterationBranch.clickableProcessIndex.length === 0){
                        this.setState({errorMsg: '', successMsg: 'Endline - Expansion stopped', loading: false})
                        break
                    }else{
                        if(mode === 0){
                            index = iterationBranch.clickableProcessIndex[0]
                        }else{
                            let pos = Math.floor(Math.random()*iterationBranch.clickableProcessIndex.length)
                            index = iterationBranch.clickableProcessIndex[pos]
                        }
                        let lastPos = iterationBranch.children.length
                        await this.metaAppFetch(iterationBranch, index)
                        iterationBranch = iterationBranch.children[lastPos]
                    }
    
                }catch(err){
                    if(this.state.errorMsg === ''){
                        this.setState({errorMsg: 'Expansion stopped - There was an internal error. ', successMsg: '', loading: false})
                    }else{
                        this.setState({errorMsg: "Expansion stopped - " + this.state.errorMsg, successMsg: '', loading: false})
                    }
                    break
                }
            }

        }
        if(i === this.state.expansionSize){
            this.setState({
                errorMsg: '',
                successMsg: 'A horizontal expansion was executed',
                loading: false})
        }
        
    }


    clickToClickedProcess = (branch, index) => {
        let newContents = []
        let iterator = -1 // -1 to fix first index with c**
        branch.content.split(/c\*\*/).forEach(piece => {
            if(iterator>=0){
                if(branch.clickableProcessIndex.indexOf(index) === iterator){
                    piece = "cd**" + piece
                    branch.clickableProcessIndex.splice(iterator, 1)
                }else{
                    piece = "c**" + piece
                }
            }
            iterator++
            newContents.push(piece)    
        })
        return newContents.join('')
    }

    changeRadioExpand = (e) =>{
        this.setState({radioExpand: Number(e.target.value)})
    }
    changeExpansionSize = (e) => {
        this.setState({expansionSize: Number(e.target.value)})
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
                    <h1 className = "mt-4">Tree View:</h1>
                    <div className = "row">
                        <div className = "col-md-9">
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
                        <div className = "col-md-3 sidebar">
                            <div className = "expand">

                            <h3>Expand process</h3>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" checked={this.state.radioExpand === 0 ? 'checked' : ''} className="form-check-input" onChange = {this.changeRadioExpand} value = '0' name="expand"/>Vertical
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="radio" checked={this.state.radioExpand === 1 ? 'checked' : ''} className="form-check-input" onChange = {this.changeRadioExpand} value = '1' name="expand"/>Horizontal First
                                    </label>
                                    </div>
                                    <div className="form-check disabled">
                                    <label className="form-check-label">
                                        <input type="radio" checked={this.state.radioExpand === 2 ? 'checked' : ''} className="form-check-input" onChange = {this.changeRadioExpand} value = '2' name="expand"/>Horizontal Random
                                    </label>
                                </div>
                                {this.state.radioExpand > 0 ? (<div className = 'form-group mt-4'>
                                        <label htmlFor="hExpandSize">Expansion Size:</label>
                                        <input id = "hExpandSize" className="form-control" type="number" min = '1' value = {this.state.expansionSize} onChange={this.changeExpansionSize} />
                                    </div>) : '' }
                            </div>
                            <hr/>
                            <div className = "definitions">
                                <h3>Definitions:</h3>
                                <p>{this.props.initialConfig.definitions}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}