import styles from '../styles/tableView.module.css' ;
function tableViewComponent({ data , type }) {
    // Component implementation
    return (
            <div className={styles.tableComponent}>
                <h1>{type}</h1>
                <div className={styles.tableMainContent}>
                    <div>
                    <div className={styles.tableCard1}></div>
                    <div className={styles.tableCard2}></div>
                    </div>
                    <div className={styles.tableInventory}>
                        <span>{type} Inventory</span>
                        <table>
                            <thead>
                                <tr>
                                <th>PRODUCT</th>
                                <th>{type}</th>
                                <th>QUANTITY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item , index) => {
                                    return <tr key={index}>
                                        <td key={item.productname} className={styles[item.productname]}><span>{item.productname}</span></td>
                                        <td><span>{type}</span></td>
                                        <td><span>{item[type.toLowerCase() + '_quantity']}</span></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
export default tableViewComponent ;