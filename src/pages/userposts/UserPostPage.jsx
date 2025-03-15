import React from 'react'
import Header from '../../components/header/header'
import PostManageTable from '../../components/posts/postManage'
export default function UserPostPage() {
  return (
    <div className="flex flex-col flex-1 bg-body-bg h-screen">
               <Header addBtnText='New Post' />
               <div className="p-5 "> 
               <div className='text-justify bg-white overflow-y-scroll  rounded-2xl h-container-h shadow-custom-shadow'>
                 <PostManageTable/> 
               </div>
            </div>
        </div>
  )
}
