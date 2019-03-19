// import modules
    const express = require('express')
    const app = express()
    const path = require("path")
    const mauderequest = require('./routes/mauderequest')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const session = require('express-session')
    // const flash = require('connect-flash')
    const cookieParser = require('cookie-parser')
   
    

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
        var initial = req.cookies['init_config']
        if(!initial){
            res.render("config/Initial")
        }else{
            var clicProcs = req.cookies['clickable_procs']
            var constr = req.cookies['constraints']
            res.render("config/metaapp", {'initial': initial,
                                        'clickable_procs' : clicProcs,
                                        'constraints' : constr})
        }
        
    })
    app.get('/clearcookies', (req, res) => {
        res.cookie('current_config', '')
        res.cookie('init_config', '')
        res.cookie('clickable_procs', '')
        res.cookie('constraints', '')
        res.redirect('/')
    })


    app.use('/mauderequest', mauderequest)



// Express listen
var PORT = 3000
app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))
