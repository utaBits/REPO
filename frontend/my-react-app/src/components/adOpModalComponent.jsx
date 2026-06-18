const addOpModalCompontent = React.memo(function OperationAddModal({ closeThisMOdal , onClose , onSuccess , products}) {
    const [formData, setFormData] = useState({})
    const [empty, setEmpty] = useState([])
    const [ endDateInput , setEndDateInput ] = useState(false)

    const handleChange = useCallback((e) => {
        if(e.target.name === 'opStatus'){
            setEndDateInput(e.target.value !== 'inProgress')
        }
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    })
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const fieldToCheck = ["opType" , "opQTY" , "product" , "opStatus" , "opStartDate"]
        const emptyies = fieldToCheck.filter(field => {return(!formData[field].trim())})
        setEmpty(emptyies)

        if(empty.length > 0 )return

        if(onSuccess){
            closeThisMOdal()
            fetchOps().then(data => {
                setOps(data);
                })
        }

    return (
        <div className={styles.addOpModal}>
            <div className={styles.addOpModalHeader}>
                <h3>{content}</h3>
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
         </div>
    )}
)}
)
