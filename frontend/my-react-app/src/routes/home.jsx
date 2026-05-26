import React , { useEffect , useState} from "react";
import {X , ChartBarIncreasing , Eye , ChevronUp , ChevronDown , LayersPlus , Funnel ,  Calendar , Zap , CircleCheckBig , Package , WeightTilde} from 'lucide-react';   
import { fetchOps } from "../api/operations.js" ;
import { fetchProducts } from "../api/products.jsx"
import { fetchDates } from "../api/dates.js";    

const typeStyles = [
    {id: 1 , label: "purchase"},
    {id: 2 , label: "placement"},
    {id: 3 , label: "extraPlacement"},
    {id: 4 , label: "takeFromVenue"},
    {id: 5 , label: "deinstall"}
]
const statusStyles = [
    {id: 1 , label: "completed"},
    {id: 2 , label: "inProgress"}
]




function HomeComponent () {
    const [ dates , setDates ] = useState([])
    useEffect(() => {
        fetchDates().then(dates =>{
            setDates(dates)
        })
    }, [])
    const [ products , setProducts ] = useState([])
    useEffect(() => {
        fetchProducts().then(data =>{
            setProducts(data)
        })
    }, [])
    const opTypes = [ 'purchase' , 'placement' , 'extraPlacement' , 'takeFromVenue' , 'deinstall']
    const opStatuses = [ 'completed' , 'inProgress' ]
    const filters = [
        { id: 0 , label: 'START DATE', icon: <Calendar /> , content: dates.map((date , index) => <div className="filterDates" key={index}><span></span><span>{date.start_date.toLocaleString().split("T")[0]}</span></div>)},
        { id: 1 , label: 'OPERATION TYPE', icon: <Zap /> , content: opTypes.map((type , index) => <div className="opTypes" key={index}><span></span><span>{type}</span></div>)},
        { id: 2 , label: 'OPERATION STATUS', icon: <CircleCheckBig /> , content: opStatuses.map((status , index) => <div className="opStatuses" key={index}><span></span><span>{status}</span></div>)},
        { id: 3 , label: 'PRODUCT', icon: <Package /> , content: products.map((product , index) => <div  key={index}  className="productsDD"><span></span><span>{product.productname}</span></div>)},
        { id: 4 ,label: 'QTY', icon: <WeightTilde /> , content: <input id="filterInput" type="number" placeholder="123..."></input>},
    ]

    const [ops , setOps] = useState([]);
    useEffect(() =>{
        fetchOps().then(data => {
            console.log(data , 'data from home.jsx') ;
            setOps(data);
        });
    }, []) ;

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
   const toggleAddOpModal = () => {setOpModal(!addOpModal)}
    return (
        <>
        <header className="mainHeader">
            <h2>Home</h2>
            <button onClick={() => toggleAddOpModal()} className="addop">Add Operation</button>
        </header>
        <div className={`homeContent ${opDetailsModal || addOpModal ? "backdroped" : ""}`}>
            <div className="cards">
                <div className="card">
                    <span className="frame"></span>
                </div>
                <div className="card">
                    <span className="frame"></span>
                </div>
                <div className="card">
                    <span className="frame"></span>
                </div>
            </div>
            <div className="operationsCard">
                  <div className="fIcon"><Funnel /><span>FILTERS</span></div>
                <div className="filters">
                    {
                        filters.map((filter , index) =>{
                            return (
                                <div key={index} className="filterContent">
                                    <div>
                                        {filter.icon}
                                        <span className="filterLabel">{filter.label}</span>
                                    </div>
                                    <button onClick={() => toggleFilter(index) }>
                                        Choose...
                                        {filterOpen === index ? <ChevronUp /> : <ChevronDown />}
                                    </button>
                                    {filterOpen === index && (<div className="dropDown">{filter.content}</div>)}
                                </div>
                            )
                        })

                    }
                </div>
                <div className="opTable">
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
                                const styles = typeStyles.find(type => type.label === op.operation_type);
                                const statusStyle = statusStyles.find(status => status.label === op.operation_status);
                                return (<tr id={op.operation_id} key={op.operation_id}>
                                    <td><span>{op.operation_id}</span></td>
                                    <td><span>{op.start_date ? op.start_date.toLocaleString().split("T")[0] : "Oops"}</span></td>
                                    <td>{<span className={styles.label}>{op.operation_type}</span>}</td>
                                    <td>{<span className={statusStyle.label}>{op.operation_status}</span>}</td>
                                    <td><span>{op.productname}</span></td>
                                    <td><span>{op.quantity}</span></td>
                                    <td onClick={() => openModal(op)}><Eye className="eyeIcon"/></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
         { opDetailsModal && (<div id={selectedOp.operation_id} className="opDetailsModal">
            <div className="opDetailsContent">
                <span>OPERATION DETAILS</span>
                <span>OP-{selectedOp.operation_id}</span>
            </div>
            <X onClick={() => openModal()} className="closeBtn"/>
            <div className="opInfos">
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
         {addOpModal && (<div className="addOpModal"></div>)}
        </>
    )
}
export default HomeComponent ;