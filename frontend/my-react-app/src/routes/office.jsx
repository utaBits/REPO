import React, { useState, useEffect } from 'react';
import { fetchLocallyData } from '../api/locally.js';
import style from '../styles/locally.module.css' ;
import  TableViewComponent  from '../components/tableView.jsx' ;
import { validateToken } from '../api/login.auth.jsx';

function officeComponent () {
    const [officeData, setOfficeData] = useState([]);
    useEffect(() =>{
        validateToken();
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