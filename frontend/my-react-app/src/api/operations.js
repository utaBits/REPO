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