import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.router.js';
import MailingService from './services/MailingService.js';
import twilio from 'twilio';

const app = express();

const PORT = process.env.PORT||8080;

const connection = mongoose.connect(process.env.MONGO_URL);

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/users',usersRouter);


app.get('/mail',async(req,res)=>{
    const mailRequest =  {
        from:"Yo mismo",
        to:["ing_mauricioespinosa@hotmail.com"],
        subject:"Pruebita de correo feliz :)",
        html:`
        <div>
            <h1 style="color:yellow;">Hola, gracias por tu interés</h1>
            <p>Agradecería mucho que te tomes un tiempo para leer mi CV</p>
            <p>El cual encontrarás adjunto ;)</p>
            <p>¡Espero podamos trabajar juntos pronto! Saludos.</p>
        </div>
        `,
        attachments: [
            {
                filename:"CV_actualizado.pdf", //Así le va a llegar en el correo,
                path:'./src/docs/cv.pdf'
            }
        ]
    }

    const mailingService = new MailingService();
    const result = await mailingService.sendMail(mailRequest);
    console.log(result);
    res.send("Enviado");
})


const twilioClient = twilio(process.env.TWILIO_SID,process.env.TWILIO_SECRET);


app.get('/twilio',async (req,res)=>{
    const result = await twilioClient.messages.create({
        from:process.env.TWILIO_NUMBER,
        to:'+525525426334',
        body:"Morirás en 3 días"
    })
    console.log(result);
    res.send("SMS enviado");
})