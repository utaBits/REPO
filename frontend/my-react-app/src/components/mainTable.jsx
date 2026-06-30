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
            options: ['products']
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
                    <tr key={item.operation_id}>
                        {tbodyContent.map((content , idx) => {
                            if(content == 'start_date' || content == 'end_date' && item[content]){
                                
                                const dates = item[content].split('T')[0]
                                return <td key={idx}>{dates}</td>
                            }else{
                                return <td key={idx}>{item[content]}</td>
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