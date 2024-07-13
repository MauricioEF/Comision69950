import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
// import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import initializePassportConfig from './config/passport.config.js';


const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));

const connection = mongoose.connect("URL MONGO")

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

// const FileStorage = FileStore(session);

app.use(session({
    secret:"=)378!122asdzxc3",
    resave:false,
    saveUninitialized:false,
    //store: new FileStorage({path:`${__dirname}/sessions`,ttl:20,reapInterval:10})
    store:MongoStore.create({
        mongoUrl:`URL MONGO`,
        ttl:60*60*24
    })
}))

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());


app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);