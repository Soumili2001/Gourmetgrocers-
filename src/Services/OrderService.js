import { myAxios } from "./helper"

export const getorders = (username)=>{
    return myAxios.get(`/orders/find/${username}`,username).then(res=>res.data);
}
export const placeorders = (orderdata,username)=>{
    return myAxios.post(`/orders/${username}`,orderdata,username).then(res=>res.data);
}

export const getallorders = (username)=>{
    return myAxios.get(`/orders/All/${username}`).then(res=>res.data);
}
export const getordersById = (orderid)=>{
    return myAxios.get(`/orders/Id/${orderid}`).then(res=>res.data);
}

export const deleteordersById = (username,orderid)=>{
    return myAxios.delete(`/orders/${username}/${orderid}`).then(res=>res.data);
}

