const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');
/* connecting to the database */
mongoose.connect(keys.mongoURI);

const app = express();

/* Used to parse PUT and POST requests and convert req parameters into json */
app.use(bodyParser.json());
/* using cookiesession */
app.use(
    cookieSession({
       maxAge : 30 * 24 * 60 * 60 * 1000,
       keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
if(process.env.NODE_ENV === 'production')
{
   /* Used to serve static files in this directory */
   app.use(express.static('client/build'));

   /* route gets intercepted when no other route has been found */
   const path = require('path');
   app.get("*",(req,res) => {
       res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);