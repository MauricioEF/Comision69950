import {Command, Option} from 'commander';

const program = new Command();

program
.option('-d, --debug','Enable debug mode for sever',false)
.requiredOption('-u <user>','Usuario que está ejecutando el programa')
.addOption(new Option('-m, --mode <mode>','Modo de ejecución').choices(['dev','staging','production']).default('production'))


program.parse();

const options = program.opts();

if(options.mode==="production"){
    //genera el log pero al monitor
    log('producción'); //Sí aparece en el monitor
}
if(options.mode==="dev"){
    log("dev") //No aparece en el monitor, únicamente en consola.
}

uploader.single()



diskStorage({
    destination:function(req,file,cb){
        if(options.mode==="dev"||options.mode==="staging"){
            //En lugar de enviar al blob storage de producción, lo envío al blob storage de dev
        }
        if(options.mode==="production"){
            //Envío el archivo a un S3 de AWS, a un Blob storage de azure o cloud storage de Google
        }
    }
})

export default options;


