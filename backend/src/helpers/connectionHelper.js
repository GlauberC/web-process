var net = require('net');
const {PromiseSocket} = require("promise-socket") 

module.exports = async command => {
    try{
        const socket = new net.Socket()
        const promiseSocket = new PromiseSocket(socket)
        await promiseSocket.connect({port: 8811, host: "localhost"})
        await promiseSocket.write(command)
        const receive = await promiseSocket.read()
        await promiseSocket.end()
        return String(receive)
    }catch(err){
        console.log(err)
    }
}