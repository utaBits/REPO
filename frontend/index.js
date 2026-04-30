import { updateOperations } from "./src/api/operations.api.js"
import { fulloffProducts } from "./src/api/products.api.js"
import { emptyFieldAction , emptyFieldActionEnd } from "./src/utils/dom.js"
import { toCreateFilterContent , filterByAdaptiveFilters } from "./src/api/filters.api.js"
import { adaptiveFilters } from "./controllers/filterscontrollers.js"
import { prettyDOM } from "./src/utils/dom.js"
import { addOperation } from "./src/api/operations.api.js"
updateOperations();
const modal = document.querySelector(".modal");
const modalcontent = document.querySelector(".modalcontent");
const addProdcutbtn = document.querySelector("#addproduct")
console.log(modal)
addProdcutbtn.addEventListener("click", () => {
        modal.classList.add("active");
        const selectProducts = modal.querySelector("#productName")
        selectProducts.addEventListener("pointerdown" ,() => {
          fulloffProducts(selectProducts)
             
        })
    document.querySelector("#closeBtn").addEventListener("click" , () =>{
        modal.classList.remove("active");
    })
});
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const operation = Object.fromEntries(formData.entries());
    console.log(operation);
    for (const key in operation) {
        if (operation[key] === "" && key !== "additionalInfo") {
            const emptyField = document.querySelector(`[name="${key}"]`);
            emptyFieldAction(emptyField);
            setTimeout(emptyFieldActionEnd, 2000, emptyField, emptyFieldAction);
            return;
        
        }
    }

    addOperation(operation).then(() => {
        modal.classList.remove("active");
        e.target.reset();



        document.querySelector("tbody").innerHTML = "";
        updateOperations();

    });
    

});

const adaptiveFilter = {};

const filterscontent = document.querySelector(".filterscontent");
const mainContent = filterscontent.querySelectorAll("select")
mainContent.forEach(select => {
    select.addEventListener("click", (e) => {
        e.stopPropagation();

        const filterValue = select.value;
        const filterName = select.id;
    
        if(e.target.children.length === 1){
            toCreateFilterContent(filterName , select , filterValue);


        }else if(filterValue === ""){ 
            
            console.log("you have already created the filter content");
        }
    
        adaptiveFilters(adaptiveFilter , select , filterValue);
        if(filterValue){
            filterByAdaptiveFilters(adaptiveFilter)  
        }


        })
});
document.addEventListener("DOMContentLoaded" , prettyDOM)

const asideBar = document.querySelector(".sidebarmenu")
asideBar.addEventListener("click" , (e) => {
if(e.target.matches(".menuitem")){
    document.querySelector(".orders").innerHTML = ""
    history.pushState({} , "" , `${e.target.textContent}`)
}
})