export function emptyFieldAction(field) {
    field.classList.add("emptyField");
    field.focus();
};
export function emptyFieldActionEnd(emptyField , emptyFieldAction) {
    emptyField.classList.remove("emptyField");
}
export function prettyDOM(){
                    const trs = document.querySelectorAll("tr")
        trs.forEach(tr => {
            const statusCell = tr.children[3]
            if(statusCell.textContent === "inProgress"){
                statusCell.classList.add("inProgress")
            }
            if(statusCell.textContent === "completed"){
                statusCell.classList.add("completed")
            }
        })

}
export const showOtpField = () =>{
    if(document.querySelector("#otpInput"))return
    else{
        const signBtn = document.querySelector("#signBtn")
        const label = document.createElement("label")
        label.for = "otpInput"

        label.innerHTML = `OTP<input id="otpInput" type="number">`
        signBtn.before(label)
    }
}
export const userValid = (success , message , func) => {
    if(success){
        func()
        console.log("raise success true function ")
        return true
    }else{
        const error = document.createElement("div")
        error.classList.add("error")
        error.textContent = message
        document.querySelector(".screen").appendChild(error)
        setTimeout(() => error.remove() , 3000)
        return false
    }
}
export function domAction(success , message){
    console.log(success , message)
    if(!success){
        console.log(success)
        const error = document.createElement("div")
        error.classList.add("error")
        error.textContent = message
        document.querySelector(".screen").appendChild(error)
        setTimeout(() => error.remove() , 3000)
    }else{
        if(document.getElementById("input3")) return 
        showOtpField()

    }
}
export function validate(username , password){
    if(!username || !password){
        console.log("ver gavagzavni")
        return false
    }else{
        return true
    }
}
export const changeUrl = (location) =>{window.location.href = location}
export const dashboardUrl = () =>{window.location.href = "http://localhost:3000/dashboard"}
export const sideBarBtn = () =>{
        const sideBarBtn = document.createElement("span")
        sideBarBtn.classList.add(".sideBarBtn")
        document.querySelector(".maincontent").appendChild(sideBarBtn)
    
}