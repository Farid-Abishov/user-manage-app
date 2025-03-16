import React from 'react'
import Header from '../../components/header/header'
import PostManageTable from '../../components/posts/PostManage'
import { ToastContainer } from 'react-toastify'
import { useParams } from "react-router-dom"
import { useGetUserQuery } from "../../store/api/user.api"

export default function UserDetail(){
    const params=useParams()
    const {data:user,...getUserFlags}=useGetUserQuery(params.id);
    
    return <div>
        {getUserFlags.isLoading ? <div>loading</div> : 
         <div className="flex flex-col flex-1 bg-body-bg h-screen">
                       <Header addBtnText='New Post' />
            {user.name}
            {user.email}
                       <div className="p-5 "> 
                       <div className='text-justify bg-white overflow-y-scroll  rounded-2xl h-container-h shadow-custom-shadow'>
                         <PostManageTable userId={params.id}/> 
                         <ToastContainer position="bottom-right" autoClose={1500} />
                       </div>
                    </div>
          </div>
        }
    </div>
}