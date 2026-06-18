import { useEffect, useState } from "react";
import { stockData } from "../api/stock.js"
import style from '../styles/stock.module.css' ;
import TableViewComponent from "../components/tableView.jsx" ;

function stockComponent () {
    const [ stockState , setStockState ] = useState([])
    useEffect(() => {
        stockData().then(data => {
            setStockState(data)
        })
    },[])
    return (
        < TableViewComponent data={stockState} type="Stock" />
    )
}
export default stockComponent ;