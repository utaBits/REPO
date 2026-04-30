export async function fulloffProducts(select){
        select.innerHTML = ""
    try{
    const resp = await fetch("/products")
    if(!resp.ok){
        throw new Error(`ar mogvces am statusit ${resp.status}`)
    }
    const data = await resp.json();
    data.forEach(product =>{
        Object.values(product).forEach(n =>{
            const nameOption = document.createElement("option")
            nameOption.value = n 
            nameOption.textContent = n
            select.appendChild(nameOption)
        })
    })
    console.log(data)
    }catch(err){
        console.log(err)
    }
}