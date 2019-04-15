import React from 'react'
import pubSub from 'pubsub-js'

export default props => {

    const errorSuccessPublish = (errorMsg, successMsg='') => {
        pubSub.publish('errorMsg', errorMsg)
        pubSub.publish('successMsg', successMsg)
    }

    const getData = () => {
        errorSuccessPublish('')
        const input = document.querySelector('.textInput').value
        if (input === ''){
            errorSuccessPublish('Invalid Config')
            return undefined // Use in parse
        }
        const inputDPC = input.split(';')
        if(!inputDPC[0] || !inputDPC[1] || !inputDPC[2] || inputDPC[3]){
            errorSuccessPublish('Expected 3 args: definitions ; process ; constraints')
            return undefined // Use in parse
        }
        return { // Use in parse
            definitions: inputDPC[0],
            process: inputDPC[1],
            constraints: inputDPC[2]
        }
    }
    
    const parse = async () => {
        const config = getData()

        if (config){
            const options = {
                method: 'POST',
                body: JSON.stringify(config),
                headers: new Headers({
                    'Content-Type' : 'application/json'
                })
            }
            try{
                const response = await fetch('http://localhost:3001/maude/parse', options)
                if(await response.status === 200){
                    errorSuccessPublish('' , 'The configuration is well formed')
                    return config   // Use in createConfig
                }else{
                    errorSuccessPublish('There was an error in configuration')
                    return false // Use in createConfig
                }
            }catch(err) {
                errorSuccessPublish('There was an internal error')
                return false // Use in createConfig
            }
        }else{
            return false // Use in createConfig
        }
    }

    const metaRequest = async (config) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(config),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }
        try {
            const response = await fetch('http://localhost:3001/maude', options)
            if(await response.status === 200){
                response.json().then( (res) => {
                    pubSub.publish('metaRed', res)
                    setTimeout(() => {
                        return props.history.push('/tree')
                    } , 500)
                })
            }else{
                errorSuccessPublish('There was an internal error')
            }
        } catch(err){
            errorSuccessPublish('There was an internal error')
        }
    }

    const createConfig = async () => {
        try{
            parse().then((resolve) => {
                if(resolve){
                    metaRequest(resolve)
                }
            })
        }catch(err){
            errorSuccessPublish('There was an internal error')
        }
    }
    return <div className = "mt-4">
        <div className="form-group mt-4">
            <label htmlFor="input">New Config:</label>
            <textarea className="form-control textInput" rows="5" id="comment" placeholder = "Definition ; Process ; Constraints"></textarea>
            <p className = "text-secondary">{`Tips: def( 'defname, tell('a) ) ; tell( 'a ) || tell( 'b ) ; 'c `}</p>
            <button onClick = {parse} className = "btn btn-primary mt-4">Parse Config</button>
            <button onClick = {createConfig} className = "btn btn-success mt-4">Create Config</button>
        </div>
    </div>
}
