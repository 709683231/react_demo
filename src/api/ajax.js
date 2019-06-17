
import axios from 'axios';

export default function ajax(url,data={},math='GET'){
    return new Promise((resolve,reject)=>{
        let promise 
        if(math === 'POST'){
           promise = axios.post(url,data)
    
        }else if(math === 'GET'){
            promise = axios.get(url,{params:data})
        }
        promise.then(
            response => {resolve(response.data)},
            err => {alert('err'+err.message)}
        )
    })
    

}

