import { prettyDOM } from "../utils/dom.js";
export function addOperation(operation){
    return fetch("/operationadd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(operation)
    }).then(res => res.json())
    .then(data => {
        console.log(data);
        return data
    })
}
export function updateOperations(){
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""
    fetch("operations",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res.json())
    .then(data => {
        data.forEach(action => {
        const { productname , start_date, operation_status, operation_type, quantity } = action;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${productname}</td>
            <td>${operation_type}</td>
            <td>${new Date(start_date).toLocaleDateString()}</td>
            <td>${operation_status}</td>
            <td>${quantity}</td>
        `;
        tbody.appendChild(tr);
        
        });    
        console.log("operations updated");
    
    })
    setTimeout(prettyDOM , 100)
}
