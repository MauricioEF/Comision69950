process.on('exit',code=>{//Escuchar cuando el proceso esté A PUNTO de finalizar
    console.log("MUERO");
   // connection.close
    console.log(code);//Código define QUÉ PASÓ
    if(code===1){
        //Si el error fue fatal, Avísale
        //Envío correo a IT
    }
});

process.on('uncaughtException',exception=>{
    //Tomar acción sobre una excepción.
    console.log("errorcito");
    console.log(exception.name);
    console.log(exception.message);
    console.log(exception.stack);
    process.exit(100);//Error controlado
});


console.log("HOLA MAMÁ");
console();