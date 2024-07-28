import { Router } from "express";

const dictionaryRouter = Router();

dictionaryRouter.param('word',(req,res,next,word)=>{
    const decodedWord = decodeURIComponent(word);
    console.log(decodedWord);
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/;
    console.log(regex.test("ok"))
    console.log(regex.test("papá"));
    console.log(regex.test("anotherS9mbol-"));
    console.log(regex.test(decodedWord));
    if(regex.test(decodedWord)){
        req.word = word;
        return next();
    }
    else{
        res.status(400).send({status:"error",error:"Invalid word"})
    }
})

dictionaryRouter.get('/:word',(req,res)=>{//%20 hace referencia a un espacio URL-encoded
    //Ya viene en req.word;
   const savedWord = req.word; //SUPONGAMOS que buscamos la palabra en la base de datos.
   res.send(savedWord);
})


dictionaryRouter.get('*',(req,res)=>{
    res.status(400).send({status:"error",error:"Palabra inválida"})
})//TOMA TODAS LAS RUTAS QUE NO COINCIDAN.

export default dictionaryRouter;