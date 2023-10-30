import { myAxios } from "./helper"

export const getAllCategories = ()=>{
    return myAxios.get("/categories").then(res=>res.data);
}

export const createCategories = (catdata,username)=>{
    return myAxios.post(`/categories/${username}`,catdata,username).then(res=>res.data);
}
export const getCategoryById = (catId)=>{
    return myAxios.get(`/categories/Id/${catId}`).then(res=>res.data);
}
export const updateCategories = (catdata,catname,username)=>{
    return myAxios.put(`/categories/${username}/${catname}`,catdata,catname,username).then(res=>res.data);
}

export const deleteCategories = (username,catname)=>{
    return myAxios.delete(`/categories/${username}/${catname}`).then(res=>res.data);
}
