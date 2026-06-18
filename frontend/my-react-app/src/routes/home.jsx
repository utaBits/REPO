import React , { useEffect , useMemo, useState , useCallback} from "react";
import {Check , X , ChartBarIncreasing , Eye , ChevronUp , ChevronDown , LayersPlus , Funnel ,  Calendar , Zap , CircleCheckBig , Package , WeightTilde} from 'lucide-react';   
import { fetchOps , addOp } from "../api/operations.js" ;
import { fetchProducts } from "../api/products.jsx"
import { fetchDates } from "../api/dates.js";  
import styles from "../styles/home.module.css" ;



const typeStyles = [
    {id: 1 , label: "purchase"},
    {id: 2 , label: "placement"},
    {id: 3 , label: "extraPlacement"},
    {id: 4 , label: "takeFromVenue"},
    {id: 5 , label: "deinstall"},
    {id: 6 , label: "provision"}
]
const statusStyles = [
    {id: 1 , label: "completed"},
    {id: 2 , label: "inProgress"}
]
    const opTypes = [ 'purchase' , 'placement' , 'extraPlacement' , 'takeFromVenue' , 'deinstall' , 'provision']
    const opStatuses = [ 'completed' , 'inProgress' ]





function HomeComponent () {
    const [ dates , setDates ] = useState([])
    const [ products , setProducts ] = useState([])
    const [ops , setOps] = useState([]);


    useEffect(() => {
        fetchDates().then(dates =>{
            setDates(dates)
        })
        fetchOps().then(data => {
            console.log(data , 'data from home.jsx') ;
            setOps(data);
        });
        fetchProducts().then(data =>{
            setProducts(data)
        })
    }, [])

//filterLabel
    const [filterOpen , setFilterOpen] = useState(null) ;
    const toggleFilter = (index) =>{
        setFilterOpen(filterOpen === index ? null : index) ;
    }

    //operation details 
    const [ opDetailsModal , setOpDetailsModal ] = useState(false)
    const [ selectedOp , setSelectedOp ] = useState(null)
    const openModal = (op) =>{
    setSelectedOp(op)    
    setOpDetailsModal(!opDetailsModal)
}
//add operation
   const [ addOpModal , setOpModal ] = useState(false)
   const AddOpModal = () => {setOpModal(true)}

   //select filter
const [ selectFilter , setSelectedFilter] = useState({data: null , state: false})
const filtersHandleClick = (index ) => {
    setSelectedFilter({data: index, state: !selectFilter.state})
}
    const filters = [
        { id: 0 , label: 'START DATE', icon: <Calendar /> , content: dates.map((date , index) => <div className={styles.filterDates} key={index}><span></span><span>{date.start_date.toLocaleString().split("T")[0]}</span></div>)},
        { id: 1 , label: 'OPERATION TYPE', icon: <Zap /> , content: opTypes.map((type , index) => <div className={styles.opTypes} key={index}><span></span><span>{type}</span></div>)},
        { id: 2 , label: 'OPERATION STATUS', icon: <CircleCheckBig /> , content: opStatuses.map((status , index) => <div className={styles.opStatuses} key={index}><span></span><span>{status}</span></div>)},
        { id: 3 , label: 'PRODUCT', icon: <Package /> , content: products.map((product , index) => <div  key={index} onClick={() => filtersHandleClick(index)} id={index} className={styles.productsDD}>{index === selectFilter.data && selectFilter.state ? <span className={styles.selected}><Check></Check></span> : <span></span>}<span>{product.productname}</span></div>)},
        { id: 4 , label: 'QTY', icon: <WeightTilde /> , content: <input id="filterInput" type="number" placeholder="123..."></input>},
    ]

//to add endDate when status !== inProgress
const  [ endDateInput , setEndDateInput ] = useState(false)
const addEndDateInput = (e) =>{
    setEndDateInput(e.target.value !== 'inProgress')
}

//emptyForm
const emptyForm = {
    opType:"",
    product:"",
    opStatus:"",
    opStartDate:"",
    opEndDate:null,
    opQTY:"",
    opDetailInfo:"",
}
//addOpInDB
const [ formData , SetFormData ] = useState({})
const handleChange = (e) => {
    e.target.name === "opStatus" && addEndDateInput(e)
    SetFormData({
        ...formData,
        [e.target.name]: e.target.value.toString()
    })
}
//close Op Modal
const closeAddModal = () =>{
    SetFormData({})
    setOpModal(false)
    setEndDateInput(false)
    SetEmptyFields([])
}

const [ emptyFields , SetEmptyFields ] = useState([])
const handleSubmit = (e) =>{
    e.preventDefault()

    const fieldToChek = ["opType" , "opQTY" , "product" , "opStatus" , "opStartDate"]
    const empty = fieldToChek.filter(field =>{return !formData[field]?.trim()})
    SetEmptyFields(empty)

    if(empty.length > 0){
        console.log(empty)
        return
    }
    const succsess = addOp(formData).then(res => {
        return res
    })
    if(succsess){
       closeAddModal()
       fetchOps().then(data => {
            setOps(data);
    })
    }
}


    return (
        <>
        <header className={styles.mainHeader}>
            <h2>Home</h2>
            <button onClick={() => AddOpModal()} className={styles.addop}>Add Operation</button>
        </header>
        <div className={styles.homeContent + (opDetailsModal || addOpModal ? ' ' + styles.backdroped : '')}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <span className={styles.frame}></span>
                </div>
                <div className={styles.card}>
                    <span className={styles.frame}></span>
                </div>
                <div className={styles.card}>
                    <span className={styles.frame}></span>
                </div>
            </div>
            <div className={styles.operationsCard}>
                  <div className={styles.fIcon}><Funnel /><span>FILTERS</span></div>
                <div className={styles.filters}>
                    {
                        filters.map((filter , index) =>{
                            return (
                                <div key={index} className={styles.filterContent}>
                                    <div>
                                        {filter.icon}
                                        <span className={styles.filterLabel}>{filter.label}</span>
                                    </div>
                                    <button onClick={() => toggleFilter(index) }>
                                        Choose...
                                        {filterOpen === index ? <ChevronUp /> : <ChevronDown />}
                                    </button>
                                    {filterOpen === index && (<div className={styles.dropDown}>{filter.content}</div>)}
                                </div>
                            )
                        })

                    }
                </div>
                <div className={styles.opTable}>
                    <div>
                        <ChartBarIncreasing />
                        <span>Operations Records</span>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TYPE</th>
                                <th>STATUS</th>
                                <th>PRODUCT</th>
                                <th>QTY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ops.map((op , index ) =>{
                                const style = typeStyles.find(type => type.label === op.operation_type);
                                const statusStyle = statusStyles.find(status => status.label === op.operation_status);
                                return (<tr id={op.operation_id} key={op.operation_id}>
                                    <td><span>{op.operation_id}</span></td>
                                    <td><span>{op.start_date ? op.start_date.toLocaleString().split("T")[0] : "Oops"}</span></td>
                                    <td>{<span className={styles[style.label]}>{op.operation_type}</span>}</td>
                                    <td>{<span className={styles[statusStyle.label]}>{op.operation_status}</span>}</td>
                                    <td><span>{op.productname}</span></td>
                                    <td><span>{op.quantity}</span></td>
                                    <td onClick={() => openModal(op)}><Eye className={styles.eyeIcon}/></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
         { opDetailsModal && (<div id={selectedOp.operation_id} className={styles.opDetailsModal}>
            <div className={styles.opDetailsContent}>
                <span>OPERATION DETAILS</span>
                <span>OP-{selectedOp.operation_id}</span>
            </div>
            <X onClick={() => openModal()} className={styles.closeBtn}/>
            <div className={styles.opInfos}>
                <div>
                    <div>
                    <span>START DATE</span><span>{selectedOp.start_date.toLocaleString().split("T")[0]}</span>
                    </div>
                    <div>
                    <span>QTY</span><span>{selectedOp.quantity} units</span></div>
                    </div>
                <div>
                    <div><span>OPERATION TYPE</span><span>{selectedOp.operation_type}</span></div>
                    <div><span>OPERATION STATUS</span><span>{selectedOp.operation_status}</span></div>
                </div>
                <div>
                    <label>PRODUCT<span>{selectedOp.productname}</span>
                    </label>
                </div>
            </div>
         </div>)}
         {addOpModal && (<div className={styles.addOpModal}>
            <div className={styles.addOpModalHeader}>
                <h3>New Operation</h3>
                <span>please enter operation details</span>
            </div>
            <div className={styles.formElement}>
            <form onSubmit={(e) =>handleSubmit(e)}>
                <label htmlFor="opType">
                    Operation Type
                    <select  onChange={(e) => handleChange(e)} name="opType" className={emptyFields.includes("opType") ? styles.error : ''} defaultValue=""><option value="" disabled hidden>TYPE</option>{opTypes.map((type , index) => <option key={index}>{type}</option>)}</select>
                </label>
                <label htmlFor="product">
                    Product
                    <select onChange={(e) => handleChange(e)} name="product" className={emptyFields.includes("product") ? styles.error : ''} defaultValue=""><option value="" disabled hidden>PRODUCT</option>{products.map((product , index) => <option key={product.productname}>{product.productname}</option>)}</select>
                </label>
                <label htmlFor="opStatus">
                    Operation Status
                    <select onChange={(e) => handleChange(e)} name="opStatus" className={emptyFields.includes("opStatus") ? styles.error : ''} defaultValue=""><option value="" disabled hidden>STATUS</option>{opStatuses.map((status , index) => <option value={status} key={index}>{status}</option> )}</select>
                </label>
                <div>
                    <label htmlFor="opStartDate">
                        Start Date
                        <input onChange={(e) => handleChange(e)} id="opStartDate" className={emptyFields.includes("opStartDate") ? styles.error : ''} name="opStartDate" type="date"></input>
                    </label>
                    {endDateInput && <label htmlFor="opEndDate">
                        End Date
                        <input onChange={(e) => handleChange(e)} id="opEndDate" name="opEndDate" type="date"></input>
                    </label>
                    }
                </div>
                <label htmlFor="opQty">
                    QTY
                    <input onChange={(e) => handleChange(e)} name="opQTY" id="opQty" className={emptyFields.includes("opQTY") ? styles.error : ''} type="number"></input>
                </label>
                <label htmlFor="opAdditionalInfo">
                    Comment
                    <textarea onChange={(e) => handleChange(e)} name="opDetailInfo"></textarea>
                </label>
            <div>
            <span onClick={() => closeAddModal()} className={styles.closeOpModal}>Close</span><button className={styles.submitOpModal} type="submit">Save</button>
            </div>
            </form>
            </div>
         </div>)}
        </>
    )
}
export default HomeComponent ;