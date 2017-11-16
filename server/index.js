const express = require('express');
// const bodyParser = require('body-parser');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const axios = require('axios');
const stripe = require('stripe')('sk_test_tYorYCXyoJ3vm1PXHt8miaRi');

const imgCtrl = require('./imgCtrl');

const secret = process.env.secret;
const dbUser = process.env.dbUser;
const dbPass = process.env.dbPass;
const database = process.env.database;
const domain = process.env.domain;
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;


//.auth0 ?

//comment comment

const port = process.env.PORT;
//for editing it's 3005
//for servering live it's 80

const connectionString = process.env.DATABASE_URL;

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

// let options = {
//     theme: {
//       authButtons: {
//         "testConnection": {
//           displayName: "The Dog Spot",
//           primaryColor: "#240115",
//           foregroundColor: "#000000",
//           icon: "https://relaxdog-4053.kxcdn.com/media/1140/dog_favicon_01home.png?width=58"
//         },
//         "testConnection2": {
//           primaryColor: "#000000",
//           foregroundColor: "#ffffff",
//         }
//       }
//     }
//   };

// let lock = new Auth0Lock('tlca6obkxOhc8z5ePk3RR6e22Fhi58cg', 'clarkmackenzie.auth0.com', options);

passport.use(new Auth0Strategy({
    domain,
    clientID,
    clientSecret,
    callbackURL:  '/auth/callback'
   }, (accessToken, refreshToken, extraParams, profile, done) => {
     //Find user in database
     console.log(profile.id);
     const db = app.get('db');
     // .then means this is a promise
     db.getUserByAuthId([profile.id]).then((user, err) => {
         console.log('INITIAL: ', user);
       if (!user[0]) { //if there isn't a user, we'll create one!
         console.log('CREATING USER');
         db.createUserByAuth([profile.displayName, profile.id]).then((user, err) => {
           console.log('USER CREATED', user[0]);
           return done(err, user[0]); // GOES TO SERIALIZE USER
         })
       } else { //when we find the user, return it
         console.log('FOUND USER', user[0]);
        //  res.redirect('/users')
         return done(err, user[0]);
       }
     });
   }
 ));

 // put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

 // pull user from session for manipulation
 passport.deserializeUser((user, done) => {
     
     done(null, user);
 });


// auth endpoints

// initial endpoint to fire off login
app.get('/login', passport.authenticate('auth0'));

// redirect to home and use the resolve to catch the user where we redirect them to
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/#!/users' }), (req, res) => {
        
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/user', (req, res) => {
    if (!req.user) return res.status(500).json({err: 'User Not Authenticated'});
    res.status(200).json(req.user);
});

// remove user from session
app.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// app.get('/api/users', imgCtrl.getUser);

// passport ^ 
// other endpoints v 

app.post('/api/image', imgCtrl.uploadImages);
app.post('/api/dogupdate', imgCtrl.updateDogs);
app.get('/api/getdogs', imgCtrl.getDogs);
app.post('/api/favoritedog', imgCtrl.favoriteDog) //gotta finish this b
app.post('/api/upvotedog', imgCtrl.upvoteDog)
app.post('/api/getadoptdogs', imgCtrl.getAdoptDogs)
app.post('/api/getshelters', imgCtrl.getShelters)

// Charge Route
app.post('/api/payment', (req, res) => {
    console.log(req.body);
    const amount = Math.round(req.body.total,4);
    // console(req.body)
    const { id, email } = req.body.token;
    const cardId = req.body.token.card.id;  

stripe.customers.create({
    email: email,
    id: id
  }).then(customer => stripe.charges.create({
    amount,
    description: 'ASPCA Donation',
    currency: 'usd',
    customer: customer.id,
    card: cardId
  }))
  .then(charge => res.json({message: 'Thank you for your donation!'}));
});

app.get('/api/getuserfavs', imgCtrl.getUserFavs)
app.get('/api/getuserdogs', imgCtrl.getUserDogs)


app.listen(port, ()=>{
    console.log(`I'll be right by your side till ${port}`)
    
});