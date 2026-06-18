import styles from '../styles/mainTable.module.css'

export function FormComponent({ jsxContent , operation }){
    return(
    <form onSubmit={() => editOp()} className={styles.editModal}>
        { jsxContent.map((item , idx) => {
            return <label key={idx}>{item.label}
              { item.tag == "input" ? < item.tag type={item.type} /*value={operation[item.dataName]}*//> : < item.tag value={operation[item.dataName]} disabled ><option>{operation[item.dataName]}</option></ item.tag > }
            </label>
        })
        }
        <button>SAVE</button>
    </form>
)
}