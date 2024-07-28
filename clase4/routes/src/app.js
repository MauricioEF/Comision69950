import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import dictionaryRouter from './routes/dictionary.router.js';

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));

const connection = mongoose.connect(`MONGO URL`)

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/dictionary',dictionaryRouter);