const express = require('express');
// const bodyParser = require('body-parser');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const imgCtrl = require('./imgCtrl');

const config = require('./config');
const { secret } = require('./config');
// .session ? 
const { dbUser, dbPass, database } = require('./config');
// .db ?
const { domain, clientID, clientSecret } = require('./config');
//.auth0 ?

const port = 3005;

const connectionString = `postgress://${dbUser}:${dbPass}@localhost/${database}`;

const app = express();

app.use(json());
// app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(express.static(`${__dirname}/../public`));

massive(connectionString).then(db => {
    app.set('db', db)});

// put passport stuff here cause that shit is WILD
// setting up express sessions
// secret: config.session.secret;
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

// using passport to access auth0
// { domain: config.auth0.domain ... etc}
passport.use(new Auth0Strategy({
    domain,
    clientID,
    clientSecret,
    callbackURL:  '/login/callback'
   }, (accessToken, refreshToken, extraParams, profile, done) => {
     //Find user in database
     console.log(+profile._json.sub.split("|").pop());
     const db = app.get('db');
     // .then means this is a promise
     db.getUserByAuthId([+profile._json.sub.split("|").pop()]).then((user, err) => {
         console.log('INITIAL: ', user);
       if (!user[0]) { //if there isn't a user, we'll create one!
         console.log('CREATING USER');
         db.createUserByAuth(["profile.displayName",+profile._json.sub.split("|").pop()]).then((user, err) => {
           console.log('USER CREATED', user[0]);
           return done(err, user[0]); // GOES TO SERIALIZE USER
         })
       } else { //when we find the user, return it
         console.log('FOUND USER', user[0]);
         return done(err, user[0]);
       }
     }).catch(err => {console.log(err)})
   }
 ));

 // put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

 // pull user from session for manipulation
 passport.deserializeUser((user, done) => {
     console.log(user);
     done(null, user);
 });


// auth endpoints

// initial endpoint to fire off login
app.get('/login', passport.authenticate('auth0'));

// redirect to home and use the resolve to catch the user where we redirect them to
app.get('/login/callback',
    passport.authenticate('auth0', { successRedirect: '/' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/user', (req, res) => {
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    res.status(200).json(req.user);
});

// remove user from session
app.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// passport ^ 
// other endpoints v 

app.post('/api/image', imgCtrl.uploadImages);
app.post('/api/dogupdate', imgCtrl.updateDogs);
app.get('/api/getdogs', imgCtrl.getDogs);
app.post('/api/favoritedog', imgCtrl.favoriteDog)


app.listen(port, ()=>{
    console.log(`I'll be right by your side till ${port}`)
    console.log();
});