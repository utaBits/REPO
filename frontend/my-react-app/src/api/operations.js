import { FileTypeCornerIcon } from "lucide-react";

export async function fetchOps(){
    const response = await fetch('http://localhost:3000/operations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const res = await response.json()
    console.log(res)
    return res;
}
export async function fetchAllOps(){
    const response = await fetch('http://localhost:3000/operations/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data;
}
export async function addOp(formData){
    const response = await fetch('http://localhost:3000/operations',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    });
    return response.status === 200
    
}
export async function editOp({ opId , formContent }){
    console.log('gamomidzaxes')
    const newData = formContent
    console.log(newData)
    
    const response = fetch(`http://localhost:3000/operations/${opId}`, {
        method: "PUT",
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
        credentials: 'include'
    })
    const answer = await response
    return answer
    
}
export async function deleteOp(opId){
    const response = await  fetch(`http://localhost:3000/operations/${opId}`, {
        method: "DELETE",
         headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    const answer = await response
    console.log(answer)
    return answer
}