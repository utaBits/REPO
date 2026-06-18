export async function fetchLocallyData(){
    try{
       const response = await  fetch("http://localhost:3000/locally" ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
       })
       return await response.json();
    }catch(err){
        console.error(err)
    }
}