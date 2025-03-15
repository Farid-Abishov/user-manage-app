import plusImg from '../../assets/icons/plus.svg'
import Modal from '../../components/modal/Modal';
import CancelIcon from '../../assets/icons/cancel.png'
import { useState } from 'react';

export default function Header({addBtnText,userName}){

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
     {addBtnText==="New User" ? <Modal isOpen={isModalOpen}>
                <div className="flex justify-between">
                    <span className="font-poppin font-medium text-lg ">Add User</span>
                    <img src={CancelIcon} onClick={closeModal} className='hover:cursor-pointer' alt="" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full">
                       
                        <div className="mt-2">
                            <p>Id</p>
                           <input type="number" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='id' />
                        </div>
                        <div className="mt-2">
                            <p>Name</p>
                           <input type="text"  className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='name' />
                        </div>
                        <div className="mt-2">
                            <p>Email</p>
                            <input type="email" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"  placeholder='email'/>
                        </div>
                       
                        <div className="mt-2">
                            <p>Status</p>
                            <input type="text" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"  placeholder='status'/>
                        </div>
                        <button className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-3">Save</button>
                    </div>
                </div>
     </Modal>:  <Modal isOpen={isModalOpen}>
                <div className="flex justify-between">
                    <span className="font-poppin font-medium text-lg ">Add Post</span>
                    <img src={CancelIcon} onClick={closeModal} className='hover:cursor-pointer' alt="" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full">
                        
                        <div className="mt-2">
                            <p>Id</p>
                           <input type="number" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='id' />
                        </div>
                        <div className="mt-2">
                            <p>User id</p>
                           <input type="number"  className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='user id' />
                        </div>
                        <div className="mt-2">
                            <p>Title</p>
                            <input type="text" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"  placeholder='title'/>
                        </div>
                       
                        <div className="mt-2">
                            <p>body</p>
                            <input type="text" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"  placeholder='body'/>
                        </div>
                        <button className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-3">Save</button>
                    </div>
                </div>
     </Modal> }
 </header>
}