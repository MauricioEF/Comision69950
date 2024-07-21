import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';


import viewsRouter from './routes/views.router.js';
import restaurantRouter from './routes/restaurant.router.js';
import dishesRouter from './routes/dishes.router.js';
import sessionsRouter from './routes/sessions.router.js';

import __dirname from './utils.js';
import initializePassportConfig from './config/passport.config.js';
import passport from 'passport';

const app = express();

const PORT = process.env.PORT||8080;

const CONNECTION_STRING = "MONGO_URL"
const connection = mongoose.connect(CONNECTION_STRING)

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.use(session({
    secret:'CoderEatsSecretGratinado',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:"MONGO_URL"
    })
}))

initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',viewsRouter);
app.use('/api/restaurants',restaurantRouter);
app.use('/api/dishes',dishesRouter);
app.use('/api/sessions',sessionsRouter);