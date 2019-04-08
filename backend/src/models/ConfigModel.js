module.exports = (definitions, process, constraints, clickProcess = '') => {
    return {
        definitions: definitions,
        process: process,
        constraints: constraints,
        clickProcess: clickProcess,
    }
}