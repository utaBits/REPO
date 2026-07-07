
export async function filtersData() {
    
    try {
        const response = await fetch('http://localhost:3000/filters', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            });
        const data = await response.json();
        return data;    
        } catch (error) {
            console.error('Error fetching filters data:', error);
            return [];
        }
}

export async function filterByStatus(targetedFilter){
    try{
        const res = await fetch(`http://localhost:3000/filter/${targetedFilter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const filteredData = await res.json()
        return filteredData
    }catch(err){
        console.log(err , 'while fetching filters')
    }
    console.log(res)
    
}
export async function filterbyadaptive(data){
    const newData = new URLSearchParams(data)
    const filterData = newData.toString()
    console.log(newData.toString() , 'easasas')
    if(!filterData){
        return
    }
    try{
        const response = await fetch(`http://localhost:3000/filterbyadaptive?${filterData}`,{
        method: 'GET',
        headers: {
            'Content-type': 'Aplication/json'
        },
        credentials: 'include'
    })
    const data = await response.json()
    return data
}catch(err){
    console.log(error , 'while fetching adaptive filters')
}
}