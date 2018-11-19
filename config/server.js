const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    jwt = require('jsonwebtoken');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(expressSession({
        key: 'user_sid',
        secret: 'ACinzdsxzifdxfgfgfcgfc',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }
));
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include('./app/routes')
    .then('./app/controllers')
    .into(app);
module.exports = app;
