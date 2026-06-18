export async function stockData(){
    try{
       const response = await  fetch("http://localhost:3000/stock")
       const data = await response.json()
       return(data)
    }catch(err){
        console.error(err)
    }
}