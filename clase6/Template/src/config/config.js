import {config} from 'dotenv';
import {Command} from 'commander';

const program = new Command();

program.requiredOption('-m, --mode <mode>','Server mode','prod')

program.parse();

const options = program.opts();

config({
    path:options.mode=="dev"?'./.env.dev':options.mode==="stg"?'./.env.stg':'./.env.prod'
});

export default {
    app:{
        PORT: process.env.PORT||8080,
        ADMIN_PWD: process.env.ADMIN_PASSWORD,
        PERSISTENCE: process.env.PERSISTENCE||"MONGO"
    },
    mongo:{
        URL:process.env.MONGO_URL,
    },
    auth:{
        jwt:{
            COOKIE: process.env.JWT_COOKIE,
            SECRET: process.env.JWT_SECRET
        },
        github:{
            CLIENT_ID: process.env.GITHUB_CLIENT,
        }
    },
    postgres: {
        URL: process.env.POSTGRES_URL //Postgres es un poquito más difícil de conectar.
    }
}