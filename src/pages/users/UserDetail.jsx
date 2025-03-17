import React from 'react'
import Header from '../../components/header/header'
import PostManageTable from '../../components/posts/PostManage'
import { ToastContainer } from 'react-toastify'
import { useParams } from "react-router-dom"
import { useGetUserQuery } from "../../store/api/user.api"
import { LuUser } from "react-icons/lu";
import { CiMail } from "react-icons/ci";

export default function UserDetail() {
    const params = useParams()
    const { data: user, ...getUserFlags } = useGetUserQuery(params.id);

    return <div>
        {getUserFlags.isLoading ? <div>loading</div> :
            <div className="flex flex-col flex-1 bg-body-bg h-screen">
                <Header addBtnText='New Post' />
                <div className="w-96 mt-3 ml-5 p-2 rounded-md flex flex-col bg-white  max-w-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <span
                            className={`rounded-xl text-sm px-2 ${user.status === "active" ? "bg-green-500 text-white" : "bg-gray-300"}`}
                        >
                            {user.status}
                        </span>
                    </div>
                    <div className='mt-1 flex flex-col '>
                        <span className="text-sm flex items-center gap-1">
                            <CiMail />
                            {user.email}
                        </span>
                        <span className='text-sm flex items-center gap-15 text-gray-500'>
                            <LuUser />
                            {user.gender}
                        </span>
                    </div>
                </div>

                <div className="p-5 ">
                    <div className='text-justify bg-white overflow-y-scroll  rounded-2xl max-h-container-h shadow-custom-shadow'>
                        <PostManageTable userId={params.id} />
                        <ToastContainer position="bottom-right" autoClose={1500} />
                    </div>
                </div>
            </div>
        }
    </div>
}