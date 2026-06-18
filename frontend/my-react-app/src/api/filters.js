export async function filtersData() {
    try {
        const response = await fetch('http://localhost:3000/filters', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            token: localStorage.getItem('token')
            });
        const data = await response.json();
        return data;    
        } catch (error) {
            console.error('Error fetching filters data:', error);
            return [];
        }
}