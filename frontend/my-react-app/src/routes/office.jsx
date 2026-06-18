import React, { useState, useEffect } from 'react';
import { fetchLocallyData } from '../api/locally.js';
import style from '../styles/locally.module.css' ;
import  TableViewComponent  from '../components/tableView.jsx' ;

function officeComponent () {
    const [officeData, setOfficeData] = useState([]);
    useEffect(() =>{
        fetchLocallyData().then((data) => {
            setOfficeData(data);
            console.log(data);
        });
    }, []);
    return (
        <TableViewComponent data={officeData} type="Locally" />
    )
}
export default officeComponent ;