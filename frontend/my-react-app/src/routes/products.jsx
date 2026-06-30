import { fetchProducts , handleDeleteProduct , addNewProduct} from "../api/products.jsx";
import { useQuery , useQueryClient , useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { Trash2 , Plus } from "lucide-react";
import styles from '../styles/products.module.css'
import { ErrorComp }  from '../utills/helpers.jsx'
  

function productsComponent () {
    const [ errorOfDelete , setDeleteError ] = useState(null)
    const [ addProductError , setAddProductError ] = useState(null)

    const queryClient = useQueryClient()

    const { data: products = [] , isLoading , isError , error } = useQuery({
        queryKey: [ 'products' ],
        queryFn: fetchProducts,
    })
  
    const mutation = useMutation({
        mutationFn: addNewProduct,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: [ 'products' ]
            })
        }
    })
    
    const deleteMutation = useMutation({
        mutationFn: handleDeleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })
    const handleAddProduct = async (value) =>{
        const result = await mutation.mutateAsync(value)
        if(result.message){
            setAddProductError(result.message)
            setTimeout(() => {setAddProductError(null)} , 3000)
        }
        console.log(result , 'res')
    }
    const handleDelete = async (productId) =>{
        const result = await deleteMutation.mutateAsync(productId)
        console.log(result.message)
        if(result.ok)return
        if(!result.ok){
            setDeleteError(result.message)
            setTimeout(() => {setDeleteError(null)} , 3000)
        }
    }
        
    //
    const [ inputValue , setInputValue ] = useState("")
    const checkInputValue = (value) =>{
        setTimeout(() => {
            setInputValue(value)
        }, 700)
    }
    if(isLoading){
        return <b>Loading Products...</b>
    }
    if(isError){
        <b>{error.message}</b>
    }
    return (
        <div className={styles.productsSpace}>
            <div className={styles.productsHeader}>
                <span>INVENTORY</span>
                <h4>Products</h4>
                <span className={styles.numberOfProduct} >{products.length} product in your list</span>
            </div>
        <div className={styles.productInput}>
            <input id="productName" placeholder="Please Add New Product" onChange={(e) => checkInputValue(e.target.value)}>
            </input>
            <Plus className={styles.plus} onClick={() => handleAddProduct(inputValue)}>
                </Plus>
                </div>
        <div className={styles.productsMain}>
            {products.map(product => {
                return <div className={styles.productList} key={product.id}><div className={styles.product}><span></span>{product.productname}</div>
                <Trash2 className={styles.productTrash} key={product.id} id={product.id} onClick={() => handleDelete(product.id)}></Trash2>
                </div>
            })}
        </div>
            { addProductError && < ErrorComp classN={styles.error} errorText={addProductError}></ErrorComp> }
            {errorOfDelete && <ErrorComp classN={styles.error} errorText={errorOfDelete}></ErrorComp>}
        </div>
    )
}
export default productsComponent ;