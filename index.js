'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const bcrypt = require('bcrypt');
const session = require('express-session');

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (username !== process.env.username || password !== process.env.password) {
      done(null, false, {message: 'Incorrect credentials.'})
      return
    }
    return done(null, { username: username }) // returned object usally contains something to identify the user
  }
))


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


const app = express();
app.use(session({
  secret: 'some s3cr3t value',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true, // only over https
    maxAge: 2 * 60 * 60 * 1000} // 2 hours
}));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());



db.on('connected',() =>{
  if(process.env.NODE_ENV ==='development'){
    require('./localhost')(app,process.env.HTTPS,process.env.PORT);

  }else{
    require('./production')(app,process.env.PORT);
  }
});


app.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login.html', 
    session: false
  })
);

app.use('/restaurant',require('./restaurant/routes'));

app.get('/', (req, res) => {
    if(req.secure){
      res.send('Hello SECURE World from JOJO');
    }else{
      res.send('Hello UNSECURE World ...');
    }
    
});

app.get('/test', (req, res) => {
    res.send('Testing is fun');
});

