export async function fetchDates(){
    const response = await fetch('http://localhost:3000/dates', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });
    const datesList = await response.json()
    console.log(datesList)
    return datesList;
}