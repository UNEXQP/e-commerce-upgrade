

import type { Products } from "../types/Product";


export const fetchData = async (): Promise<Products[]> => { 
    const response=await fetch('https://fakestoreapi.com/products')
    
    if(!response.ok){
        throw new Error('failed to launch product')
    }

    return response.json()
}



