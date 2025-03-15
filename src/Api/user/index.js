import api from "../base"

export  const getUserList=async ()=>{
  let result = await api.get('public/v2/users')
    return result;
}




