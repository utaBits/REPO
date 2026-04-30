function adaptiveFilters(adaptiveFilter , select , filterValue) {
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
