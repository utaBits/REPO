import { apiUrl } from '../config.js'
export async function fetchLocallyData(){
    try{
       const response = await  fetch(`${apiUrl}/locally` ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
       })
       return await response.json();
    }catch(err){
        console.error(err)
    }
}