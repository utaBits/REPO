import { FileTypeCornerIcon } from "lucide-react";

export async function fetchOps(){
    const response = await fetch('http://localhost:3000/operations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });
    return response.json();
}
export async function fetchAllOps(){
    const response = await fetch('http://localhost:3000/operations/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    });
    return response.status === 200
    
}
export async function editOp({ opId , formContent }){
    const newData = formContent
    console.log(newData)
    
    const response = fetch(`http://localhost:3000/operations/${opId}`, {
        method: "PUT",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include'
    })
    const answer = await response
    console.log(answer)
    return answer
}