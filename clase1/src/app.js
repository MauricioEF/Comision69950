import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser'; //express-session usa cookieParser por dentro, no necesito restaurarlo
import session from 'express-session';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import cookiesRouter from './routes/cookies.router.js';

import authMiddleware from './middlewares/auth.js';

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));

const connection = mongoose.connect(`MONGUITO URL`)

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use(cookieParser('A=)&%&ASDDHKZJCKASDÑFL')); //Sólo encender si no tengo express-session activo
app.use(session({
    secret:"CoderSecretoNolecuentesANadieShhhhh",
    resave:true,
    saveUninitialized:true
}))

app.use((req,res,next)=>{
    console.log("Procesando mi nuevo middleware");
    next();
})

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send("OK");
})

app.get('/login',(req,res)=>{
    const loginUser = {
        firstName:"Eliseo",
        role:"admin"
    }
    req.session.user = loginUser;

    res.send("Ok");
})

app.get('/logout',(req,res)=>{
    req.session.destroy((error)=>{
        if(error) return res.status(500).send("Oh no");
        res.send("Deslogueado :)");
    })
})

app.get('/profile',authMiddleware,(req,res)=>{
    console.log(req.session.user);
    res.send("OK");
})

app.get('/counter',(req,res)=>{
    if(req.session.counter){
        //Ya visitó este endpoint antes
        res.send(`Has visitado este endpoint ${++req.session.counter} veces`)
    }else{
        req.session.counter = 1;
        res.send("VAYAAA BIENVENIDO!!!")
    }
})



app.use('/',viewsRouter);
app.use('/api/users',usersRouter);
app.use('/api/cookies',cookiesRouter);
