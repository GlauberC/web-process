import React from 'react'

export default props => (
    <div className = 'row mt-4 defition' id = {'def' + props.value}>
        <label className = "col-md-2">Definition {Number(props.value) + 1}:</label>
        <div className = "col-md-9">
            <input type="text" className = 'form-control input-definition'/>
        </div>
    </div>
)