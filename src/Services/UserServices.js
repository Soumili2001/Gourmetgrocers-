import { myAxios } from "./helper"

//create new user service
export const createNewUser = (userData=>{
    return myAxios.post("/user/register",userData).then(res=>res.data);
})

export const LoginNewUser = (userData=>{
    return myAxios.post("/user/login",userData).then(res=>res.data);
})

export const LogoutUser = (username=>{
    return myAxios.post(`/user/logout/${username}`,username).then(res=>res.data);
})


