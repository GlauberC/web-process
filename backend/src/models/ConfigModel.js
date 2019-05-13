module.exports = (definitions, process, constraints, selectProcess = '') => {
    return {
        definitions: definitions,
        process: process,
        constraints: constraints,
        configVisualization: '',
        clickableProcessIndex: [],
        selectProcess: selectProcess,
    }
}