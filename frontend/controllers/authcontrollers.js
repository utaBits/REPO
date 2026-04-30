
function validate(username , password){
    if(!username || !password){
        console.log("ver gavagzavni")
        return false
    }else{
        return true
    }
}
async function fetchuser(data){
    try{
      const response =  await fetch("/auth/login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const res = await response.json()
    return domAction(res.success , res.message)

}catch(err){
    console.error("Network Problem: " ,err)
}

}
function domAction(success , message){
    if(!success){
        console.log(success)
        const error = document.createElement("div")
        error.classList.add("error")
        error.textContent = message
        document.querySelector(".screen").appendChild(error)
        setTimeout(() => error.remove() , 3000)
    }else{
        if(document.getElementById("input3")) return 

    }
}
