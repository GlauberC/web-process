// import modules
    const express = require('express')
    const app = express()
    const path = require("path")
    const mauderequest = require('./routes/mauderequest')
    const expbs = require('express-handlebars')
    const bodyParser = require('body-parser')
    const session = require('express-session')
    // const flash = require('connect-flash')
    const cookieParser = require('cookie-parser')
    require('dotenv/config')
   
    

// Initial config
    // Sessão
    app.use(session({
        secret: "maudewebsession",
        resave: true,
        saveUninitialized: true
    }))
    // app.use(flash())

    app.use(cookieParser());

    // Handlebars
    const hbs = expbs.create({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views/mainLayout'),
        partialsDir: path.join(__dirname, 'views/pieces'),
        helpers:{
            activeConfigPage: 'active',
            activeProcessPage: ''
        }
    })
    app.engine('handlebars', hbs.engine)
    app.set('view engine', 'handlebars')
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

    // Public
        app.use(express.static(path.join(__dirname, "public")))

// Receive data


// Routes
    app.get('/', (req, res) =>{
        hbs.helpers.activeConfigPage = 'active'
        hbs.helpers.activeProcessPage = ''
        res.render("config/Initial")        
    })
    app.get('/process', (req,res) => {
        var initial = req.cookies['init_config']
        var clicProcs = req.cookies['clickable_procs']
        var constr = req.cookies['constraints']
        hbs.helpers.activeConfigPage = ''
        hbs.helpers.activeProcessPage = 'active'
        res.render("config/metaapp", {'initial': initial,
                                    'clickable_procs' : clicProcs,
                                    'constraints' : constr})
    })
    // app.get('/clearcookies', (req, res) => {
    //     res.cookie('current_config', '')
    //     res.cookie('init_config', '')
    //     res.cookie('clickable_procs', '')
    //     res.cookie('constraints', '')
    //     res.redirect('/')
    // })


    app.use('/mauderequest', mauderequest)



// Express listen
app.listen(process.env.PORT, () => console.log(`Server is running in http://localhost:${process.env.PORT}`))
