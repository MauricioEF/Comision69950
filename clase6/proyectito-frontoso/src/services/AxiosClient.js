import axios from "axios";

export default class AxiosClient {
    makeGetRequest = async({url, config}) =>{
        try{
            const result = await axios.get(url,{
                ...config,
                signal:config?.controller?.signal
            })
            return {
                status:result.status,
                data:result.data
            }
        }catch(error){
            if(config.withStackTrace){
                console.log(error);
            } else {
                console.log(error.message);
            }
        }
    }
    makePostRequest = async({url,body,config}) =>{
        try{
            const result = await axios.post(url,body,{
                ...config,
                signal:config?.controller?.signal
            })
            return {
                status:result.status,
                data:result.data
            }
        }catch(error){
            if(config.withStackTrace){
                console.log(error);
            } else {
                console.log(error.message);
            }
        }
    }
}