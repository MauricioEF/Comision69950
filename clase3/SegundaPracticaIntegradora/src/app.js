import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';


import viewsRouter from './routes/views.router.js';
import restaurantRouter from './routes/restaurant.router.js';
import dishesRouter from './routes/dishes.router.js';

import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT||8080;

const CONNECTION_STRING = "AQUI VA TU URL DE MONGO ATLAS O DE TU CONEXIÓN LOCAL"
const connection = mongoose.connect(CONNECTION_STRING)

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',viewsRouter);
app.use('/api/restaurants',restaurantRouter);
app.use('/api/dishes',dishesRouter);