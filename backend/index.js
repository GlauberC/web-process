const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
require('dotenv/config')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
    console.log("Env" +process.env.MAUDE_DIR)
    res.send('OK')
})
require('./src/controllers/maudeController')(app)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running: localhost:${PORT}`))

module.exports = app