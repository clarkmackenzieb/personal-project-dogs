const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const config = require('./config');
const { secret } = require('./config').session;
const { dbUser, database } = require('./config').db;
const { domain, clientID, clientSecret } = require('./config').auth0;

const port = 3005;

const connectionString = `postgress://${dbUser}@localhost/${database}`;

const app = express();

app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../public`));

massive(connectionString).then(db => app.set('db', db));

// put passport stuff here cause that shit is WILD