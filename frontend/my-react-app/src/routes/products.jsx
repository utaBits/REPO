import { fetchProducts , handleDeleteProduct , addNewProduct} from "../api/products.jsx";
import { useQuery , useQueryClient , useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { Trash2 , Plus } from "lucide-react";

  

function productsComponent () {
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
                queryKey: [ 'products' ]
            })
        }
    })
        
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
        <>
        <div>
            <input id="productName" placeholder="Please Add New Product" onChange={(e) => checkInputValue(e.target.value)}>
            </input>
            <Plus onClick={() => mutation.mutate(inputValue)}>
                </Plus>
                </div>
        <div>
            {products.map(product => {
                return <div key={product.id}>{product.productname}
                <Trash2 key={product.id} id={product.id} onClick={() => deleteMutation.mutate(product.id)}></Trash2>
                </div>
            })}
        </div>
        </>
    )
}
export default productsComponent ;