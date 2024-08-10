import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import {fork} from 'child_process';


import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import ViewsRouter from './routes/ViewsRouter.js';
import sessionsRouter from './routes/sessions.router.js';
import SessionsRouter from './routes/SessionsRouter.js';
import initializePassportConfig from './config/passport.config.js';
import config from './config/config.js';

const app = express();

const PORT = config.app.PORT;

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));

const connection = mongoose.connect(config.mongo.URL)

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

initializePassportConfig();
app.use(passport.initialize());

app.use('/',ViewsRouter);
app.use('/api/sessions',SessionsRouter);


function tareaCompleja() {
    let result = 0;
    for(let i=0;i<5e9;i++){
        result+=i;
    }
    return result;
}

let contador = 0;

app.get('/otraTarea',async (req,res)=>{
    res.send(`Contador: ${++contador}`)
})

app.get('/tareaCompleja',async (req,res)=>{
    const child = fork('./src/complex.js');
    child.on('message',result=>{
        res.send(`Resultado complejo: ${result}`)
    })
})
