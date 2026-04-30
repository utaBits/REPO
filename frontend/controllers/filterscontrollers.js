export function adaptiveFilters(adaptiveFilter , select , filterValue) {
    if (Object.keys(adaptiveFilter).length < 5  && filterValue != "") {
        select.id === "start_date" ? filterValue = filterValue.split("T")[0] : null
        adaptiveFilter[select.id] = filterValue
        console.log(adaptiveFilter , "is rac ginda")

    }else if(Object.keys(adaptiveFilter).length > 4){
        null
    }else{
        console.log("filters is empty or you have already created the filters content");
    }
    return adaptiveFilter;
}
export async function filterByAdaptiveFilters(adaptiveFilter) {
    const queryadaptiveFIlter = new URLSearchParams(adaptiveFilter)
    console.log(queryadaptiveFIlter.toString())
               await fetch("/filterbyadaptive?" + queryadaptiveFIlter, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            if(data.length === 0){
                const tbody = document.querySelector("tbody");
                tbody.textContent = "no results found";
            }else{
            const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
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
        console.log(tr , "this is the tr element from adaptive filters");
        })}})
        setTimeout(prettyDOM , 100)
    };
