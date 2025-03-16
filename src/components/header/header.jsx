import plusImg from '../../assets/icons/plus.svg'
import { useState } from 'react';
import CreateUserModal from '../../pages/users/CreateUserModal';
import CreatePostModal from '../posts/CreatePostModal';

export default function Header({addBtnText}){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
   
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return <header className="bg-white  py-4 px-6 ">
    <div className="flex items-center justify-end max-[765px]:justify-around ">
        <div className="flex gap-3 w-full justify-end max-[765px]:justify-between  ">
        <button   className="bg-custom-red text-white rounded-md w-addbtn p-2 flex gap-2 justify-center"  onClick={openModal}> 
            <img src={plusImg} alt="" className='h-full'/> 
            <span >{addBtnText}</span>
       </button>
        </div>
    </div>
     {addBtnText==="New User" ? <CreateUserModal isOpen={isModalOpen} closeModal={closeModal}/>:  <CreatePostModal isOpen={isModalOpen} closeModal={closeModal} /> }
 </header>
}