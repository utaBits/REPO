import { showOtpField, userValid } from "../utils/dom.js"
import { changeUrl } from "../utils/dom.js"
import { dashboardUrl } from "../utils/dom.js"

export async function fetchUserValidate(userOtp , username) {
    try{
       const response = await fetch(`/auth/verify-otp`,{
        method: "POST",
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
            "username": username
        },
        body: JSON.stringify({ userOtp })
    })
    const res = await response.json()
    userValid(res.success,res.message, dashboardUrl)
    console.log(res)
}catch(err){
        console.error(err , "this is the Network or server problem , or there is same endpoint")
    }
}

export async function fetchUser(data){
    try{
      const response =  await fetch("/auth/login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const res = await response.json()
    console.log(res.success , res.message , res.token)
    localStorage.setItem("token",res.token)
    return userValid(res.success , res.message , showOtpField)

}catch(err){
    console.error("Network Problem: " ,err)
}
}