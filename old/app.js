// import modules
    const express = require('express')
    const app = express()
    const path = require("path")
    const mauderequest = require('./routes/mauderequest')
    const expbs = require('express-handlebars')
    const bodyParser = require('body-parser')
    const session = require('express-session')
    const flash = require('connect-flash')
    const cookieParser = require('cookie-parser')
    require('dotenv/config')
    const stringTreatment = require('./helpers/StringTreatment')
   
    

// Initial config
    // Sessão
    app.use(session({
        secret: "maudewebsession",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    app.use( (req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.warning_msg = req.flash('warning_msg')
        next()
    })

    app.use(cookieParser());

    // Handlebars
    const hbs = expbs.create({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views/mainLayout'),
        partialsDir: path.join(__dirname, 'views/pieces'),
        helpers:{
            activeConfigPage: 'active',
            activeProcessPage: '',
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
        res.render("config/Initial", {inputInitial: req.cookies['inputInitial']})        
    })
    app.get('/process', (req,res) => {
        var currentBranch= req.cookies['current_branch']
        var clicProcs = req.cookies['clickable_procs']
        var constr = req.cookies['constraints']
        var tree = req.cookies['tree']
        hbs.helpers.activeConfigPage = ''
        hbs.helpers.activeProcessPage = 'active'
        var isTerminal = stringTreatment.isTerminalConfiguration(currentBranch.name)
        res.render("config/metaapp", {'currentId': currentBranch.id,
                                    'clickable_procs' : clicProcs,
                                    'constraints' : constr,
                                    'isTerminal':isTerminal,
                                    'treeData': JSON.stringify(tree)})
    })

    app.use('/mauderequest', mauderequest)



// Express listen
app.listen(process.env.PORT, () => console.log(`Server is running in http://localhost:${process.env.PORT}`))
