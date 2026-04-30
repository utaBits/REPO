import { prettyDOM } from "../utils/dom.js";
export async function toCreateFilterContent(filterName , parent , filterValue) {
    console.log(filterName , "es aris rasac stxovs")
    await fetch(`/filter/${filterName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(filterName => {
            const option = document.createElement("option");
            for (const key in filterName) {
            option.value = filterName[key];
            option.textContent = filterName[key];
            filterName.start_date ? option.textContent = filterName.start_date.split("T")[0] : option.textContent = filterName[key];
            }
            parent.appendChild(option);
            
        });
    })
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
