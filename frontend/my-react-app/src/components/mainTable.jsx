import { Trash2 ,SquarePen } from "lucide-react"
import { use, useState } from "react"
import styles from '../styles/mainTable.module.css'
import { FormComponent } from "../components/formComponent.jsx"
import { filterByStatus } from "../api/filters.js"
import { useEffect } from "react"


    const jsxContent = [
        {
            label: "START DATE",
            tag: "input",
            type: "date",
            dataName: "start_date",
        },
        {
            label: "TYPE",
            tag: "select",
            type: "opType",
            dataName: "operation_type",
            options: ['purchase' , 'placement' , 'extraPlacement' , 'provision' , 'takeFromVanue' , 'deinstall']
        },
        {
            label: "STATUS",
            tag: "select",
            type: null,
            dataName: "operation_status",
            options: ['inProgress' , 'completed']
        },
        {
            label: "END DATE",
            tag: "input",
            type: "date",
            dataName: "end_date",
        },
        {
            label: "PRODUCT",
            tag: "select",
            type: null,
            dataName: "productname",
            options: null
        },
        {
            label: "QTY",
            tag: "input",
            type: "number",
            dataName: "quantity"
        }
    ]
export function MainTable({theadContent , data , tbodyContent , onDelete , onEdit}){

    

    const [ wantEdit , setWantEdit ] = useState(false)
    const hideForm = ()=>{
        setWantEdit(false)
    }
    const [ selectedOp , setSelectedOp ] = useState(null)
const handleOpEdit = (op) =>{
    setWantEdit(true)
    setSelectedOp(op)
}

const [ filter , setFilter ] = useState('ALL')
const [ tableContent , setTableContent ] = useState(data)
const handleFilter = async (status , e) =>{
    if(status == 'all'){
        setTableContent(data)
    }else{
    const filteredData = await filterByStatus(status)
    setTableContent(filteredData)
    }
    setFilter(e.target.textContent)

}
useEffect(() =>{
    setTableContent(data)
    setFilter('ALL')
},[data])

    return (
        <div className={styles.mainContent}>
            <div className={styles.mainTableHeader}>
                <div className={styles.mainTableHeaderTop}>
                    <span>OPS</span>
                    <div>
                        <h3>Operations Manifest</h3>
                        <span>warehouse & product movement log</span>
                    </div>
                </div>
                <div className={styles.mainTableHeaderBottom}>
                    <span className={filter == 'ALL' && styles.active} onClick={(e) => handleFilter('all' , e)}>ALL</span>
                    <span className={filter == 'IN PROGRESS' && styles.active} onClick={(e) => handleFilter('inProgress' , e)}>IN PROGRESS</span>
                    <span className={filter == 'COMPLETED' && styles.active} onClick={(e) => handleFilter('completed' , e)}>COMPLETED</span>
                </div> 
            </div>
        <table>
            <thead className={styles.mainTableThead}>
                <tr>
            {theadContent.map((item , index) => {
                return <th key={index}>{item}</th>
            })}
            </tr>
            </thead>
            <tbody>
                {tableContent?.map((item , index) => (
                    <tr key={item.operation_id}>
                        {tbodyContent.map((content , idx) => {
                            if(content == 'start_date' || content == 'end_date' && item[content]){
                                const dates = item[content].split('T')[0]
                                return <td key={idx}>{dates}</td>
                            }else{
                                return <td className={styles[item[content]]} key={idx}>{item[content]}</td>
                            }
                        })}
                        <td><SquarePen className={styles.squarePen} onClick={() => handleOpEdit(item)}></SquarePen></td>
                        
                        <td><Trash2 className={styles.trash} onClick={() => onDelete(item.operation_id)}></Trash2></td>
                    </tr>
                ))}
            </tbody>
        </table>
        { wantEdit && <FormComponent jsxContent={jsxContent} operation={selectedOp} onHide={hideForm} onEdit= { onEdit }></FormComponent>}
        </div>
    )
}