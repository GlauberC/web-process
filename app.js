// import modules
    const express = require('express')
    const app = express()
    const path = require("path")
    const mauderequest = require('./routes/mauderequest')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const session = require('express-session')
    const flash = require('connect-flash')
   
    

// Initial config
    // Sessão
    app.use(session({
        secret: "maudewebsession",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // Middleware
    app.use( (req, res, next) => {
        res.locals.init_config = req.flash('init_config')
        res.locals.clickable_procs = req.flash('clickable_procs')
        res.locals.constraints = req.flash('constraints')
        next()
    })

    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');

    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

    // Public
        app.use(express.static(path.join(__dirname, "public")))

// Receive data


// Routes
    app.get('/', (req, res) =>{
        res.render("config/initial")
    })

    app.use('/mauderequest', mauderequest)



// Express listen
var PORT = 3000
app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))
