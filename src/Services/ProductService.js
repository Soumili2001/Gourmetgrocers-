import { myAxios } from "./helper"

export const getAllProducts = ()=>{
    return myAxios.get("/products").then(res=>res.data);
}


export const getAllProductsByCategory = (catName)=>{
    return  myAxios.get("/products/"+catName).then(res=>res.data);
}
export const getProductById = (prodId)=>{
    return myAxios.get("/products/Id/"+prodId).then(res=>res.data);
}
export const createProduct = (productData,username)=>{
    return myAxios.post(`/products/${username}`,productData,username).then(res=>res.data);
}
export const updateProduct = (productData,prodId,username)=>{
    return myAxios.put(`/products/update/${username}/${prodId}`,productData).then(res=>res.data);
}
export const deleteProduct = (username,prodId)=>{
    return myAxios.delete(`/products/${username}/${prodId}`,username,prodId).then(res=>res.data);
}

