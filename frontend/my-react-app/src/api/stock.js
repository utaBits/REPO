import { apiUrl } from '../config.js'

export async function stockData(){
    try{
       const response = await  fetch(`${apiUrl}/stock` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
       const data = await response.json()
       return(data)
    }catch(err){
        console.error(err)
    }
}