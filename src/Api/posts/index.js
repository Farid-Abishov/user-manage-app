import api from "../base"

export  const getPostList=async ()=>{
  let result = await api.get('public/v2/posts')
    return result;
}