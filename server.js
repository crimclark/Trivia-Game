require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const hbs = require('express-handlebars')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const app = express()

const http = require('http').Server(app);
const io = require('socket.io')(http);

// CONFIG
require('./db/config')
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}))
app.set('view engine', 'hbs')

// ROUTES
app.use('/', require('./routes/index'))
app.use('/example', require('./routes/example'))
app.use(require('./routes/error'))

//SOCKET
// io.on('connection', socket => {
//   console.log('a user connected');

//   socket.on('red click', function() {
//     io.emit('red click');
//   })

//   socket.on('green click', function(){
//     io.emit('green click');
//   })
// })

var sockets = require('./routes/sockets')(io);

// sockets(io);

const port = process.env.PORT || 3000
http.listen(port, () => {
  console.log(`Listening on ${port}`)
})
