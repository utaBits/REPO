import styles from '../styles/mainTable.module.css'
import { useState } from 'react'
export function FormComponent({ jsxContent , operation , onHide , onEdit}){

    const [ formContent , setFormContent ] = useState({})
    const handleChange = (e) =>{
        e.preventDefault()
        const { name , value } = e.target
        setFormContent(
            prev => ({
            ...prev,
            [name]: value,
        }))
    }
async function handleOpEdit(e){
    e.preventDefault()
    const opId = operation.operation_id
    const response = await onEdit({ opId , formContent })
    console.log(response)
    if(response.status == '200'){
        onHide()
    }
}

    return(
    <form onSubmit={(e) => handleOpEdit(e)} className={styles.editModal}>
        { jsxContent.map((item , idx) => {
            return <label key={idx}>{item.label}
              { item.tag == "input" ? < item.tag onChange={(e) => handleChange(e)} name={item.dataName} type={item.type} /*value={operation[item.dataName]}*//>
               : 
               < item.tag onChange={(e) => handleChange(e)} name={item.dataName} defaultValue={operation[item.dataName]} >
                <option className={styles.defaultValue}>
                    {operation[item.dataName]}
                </option>
                {item.options.map((option , idx) =>{return <option key={idx}>{option}</option>}) }
                </ item.tag > }
            </label>
        })
        }
        <button type='submit'>SAVE</button>
    </form>
)
}