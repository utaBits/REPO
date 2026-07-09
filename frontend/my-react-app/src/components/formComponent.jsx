import { use } from 'react'
import styles from '../styles/mainTable.module.css'
import { useState , useEffect } from 'react'
import { fetchProducts } from '../api/products.jsx'
import { ErrorComp }from '../utills/helpers.jsx'



export function FormComponent({ jsxContent , operation , onHide , onEdit , onClose}){

    const [ formContent , setFormContent ] = useState(null)
    const [ emptyFormContent , setEmptyFormContent ] = useState(false)
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
    if(!formContent){
        setEmptyFormContent(true)
        setTimeout(() => {setEmptyFormContent(false)} , 3000)
        return
    }
    const response = await onEdit({ opId , formContent })
    console.log(response)
    if(response.status == '200'){
        onHide()
    }
}
const handleClose = () =>{
    onClose()
}
    return(
    <form onSubmit={(e) => handleOpEdit(e)} className={styles.editModal}>
        { jsxContent.map((item , idx) => {
            return <label key={idx}>{item.label}
              { item.tag == "input" ? < item.tag onChange={(e) => handleChange(e)} name={item.dataName} type={item.type} /*value={operation[item.dataName]}*//>
               : 
               < item.tag onChange={(e) => handleChange(e)} name={item.dataName} defaultValue={operation[item.dataName]} >
                {item.dataName == 'productname' &&  null}
                <option className={styles.defaultValue}>
                    {operation[item.dataName]}
                </option>
                {item.options?.map((option , idx) =>{return <option key={idx}>{option}</option>}) }
                </ item.tag > }
            </label>
        })
        }
        <button type='submit'>SAVE</button>
        <button onClick={() => handleClose()}>close Temo</button>
        { emptyFormContent && <ErrorComp classN={styles.error} errorText="cant to save unchanged operation" /> }
    </form>
)
}