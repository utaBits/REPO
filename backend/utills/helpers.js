import { pool } from "../config/db.js"

export async function defineProductId(productName) {
    const id = pool.query("SELECT id FROM Products WHERE productname = $1", [productName]);
    const product_Id = id.then((result) => {return result.rows[0].id});
     
    return await product_Id;
}


export async function addOperationInDom(){
    let operationList = await pool.query("SELECT operations.operation_id, products.productname , operations.operation_type , operations.start_date , operations.operation_status , operations.quantity FROM Operations JOIN Products ON Operations.product_id = Products.id ORDER BY operation_id DESC");
    return operationList.rows;
}

