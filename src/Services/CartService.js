import { myAxios } from "./helper"

export const addItemtocart = (cartdata,username)=>{
    return myAxios.post(`/cart/${username}`,cartdata,username).then(res=>res.data);
}

export const getcart = (username)=>{
    return myAxios.get(`/cart/find/${username}`,username).then(res=>res.data);
}

export const decreasecart = (cartdata,username)=>{
    return myAxios.put(`/cart/${username}`,cartdata,username).then(res=>res.data);
}
export const deletecartItem = (prodId,username)=>{
    return myAxios.delete(`/cart/${username}/${prodId}`,prodId,username).then(res=>res.data);
}
