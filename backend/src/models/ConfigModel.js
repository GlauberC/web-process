module.exports = (definitions, process, constraints, clickableProcess = '', selectProcess = '') => {
    return {
        definitions: definitions,
        process: process,
        constraints: constraints,
        clickableProcess: clickableProcess,
        selectProcess: selectProcess,
    }
}