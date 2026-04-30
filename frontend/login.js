import { fetchUser , fetchUserValidate } from "./src/api/auth.api.js"
import { emptyFieldAction } from "./src/utils/dom.js"
import { changeUrl } from "./src/utils/dom.js"

let step = 1

document.querySelector("form").addEventListener("submit" , (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const data =  Object.fromEntries(formData.entries())
    const { username , password} = data
    if(!username || !password){
        return
    }else{
        if(!document.querySelector("#otpInput")){
            fetchUser(data)
        }else{
            const oi = document.querySelector("#otpInput")
                const otp = oi.value
                if(!otp){
                    emptyFieldAction(oi)
                    return
                }
                fetchUserValidate(otp , username)
                console.log(otp)
                }
        
    }
    })