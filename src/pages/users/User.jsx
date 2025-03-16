import Header from '../../components/header/header'
import UserManageTable from '../../components/user/UserManage'
import { ToastContainer } from 'react-toastify'
export default function UserPage(){
    return <div className="flex flex-col flex-1 bg-body-bg h-screen">
           <Header addBtnText='New User'  />
           <div className="p-5 "> 
           <div className='text-justify bg-white overflow-y-scroll  rounded-2xl h-container-h shadow-custom-shadow'>
             <UserManageTable/> 
             <ToastContainer position="bottom-right" autoClose={1500} />
           </div>
        </div>
        
      
    </div>
}