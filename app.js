require('dotenv').config();

var express = require('express');
var app = express();
var { sequelize } = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller')
const validateSession = require('./middleware/validate-session');
sequelize.sync()
app.use(express.urlencoded({extended: true})); 
app.use(express.json());  
app.use('/api/auth', user);
app.use(validateSession);
app.use('/api/game', game);
app.listen(process.env.CONNECT_PORT, function() {
    console.log("App is listening on 4000");
})