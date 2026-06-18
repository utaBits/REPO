import { Trash2 ,SquarePen } from "lucide-react"
import { useState } from "react"
import styles from '../styles/mainTable.module.css'
import { FormComponent } from "../components/formComponent.jsx"

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
        },
        {
            label: "STATUS",
            tag: "select",
            type: null,
            dataName: "operation_status",
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
        },
        {
            label: "QTY",
            tag: "input",
            type: "number",
            dataName: "quantity"
        }
    ]
export function MainTable({theadContent , data , tbodyContent }){


    const [ wantEdit , setWantEdit ] = useState(false)
    const [ selectedOp , setSelectedOp ] = useState(null)
const handleOpEdit = (op) =>{
    setWantEdit(true)
    setSelectedOp(op)
}

    return (
        <div className={styles.mainContent}>
        <table>
            <thead className={styles.mainTableThead}>
                <tr>
            {theadContent.map((item , index) => {
                return <th key={index}>{item}</th>
            })}
            </tr>
            </thead>
            <tbody>
                {data.map((item , index) => (
                    <tr key={index}>
                        {tbodyContent.map((content , idx) => {
                           return <td key={idx}>{item[content]}</td>
                        })}
                        <td><SquarePen id={item.operation_id} onClick={() => handleOpEdit(item)}></SquarePen></td>
                        
                        <td><Trash2></Trash2></td>
                    </tr>
                ))}
            </tbody>
        </table>
        { wantEdit && <FormComponent jsxContent={jsxContent} operation={selectedOp}></FormComponent>}
        </div>
    )
}