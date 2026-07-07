import { apiUrl } from "../config.js";
export async function fetchDates(){
    const response = await fetch(`${apiUrl}/dates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const datesList = await response.json()
    console.log(datesList)
    return datesList;
}