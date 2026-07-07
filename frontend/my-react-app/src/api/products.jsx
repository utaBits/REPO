export async function fetchProducts(){
    const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const productsList = await response.json()
    return productsList;
}
export async function handleDeleteProduct(productId){
    const response = await fetch(`http://localhost:3000/products/${productId}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    const res = await response.json()
    return res
}
export async function addNewProduct(productName){
    if(!productName.trim()){
        console.log("გთხოვთ შეიყვანოთ პროდუქტი")
        return { message: 'please enter the product' }
    }
    const res = await fetch(`http://localhost:3000/products/${productName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    return res
}