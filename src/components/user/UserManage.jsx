import './usertable.css'
import Bin from '../../assets/icons/Bin.svg'
import Edit from '../../assets/icons/Edit.svg'
import CancelIcon from '../../assets/icons/cancel.png'
import Modal from '../modal/Modal'
import { getUserList } from '../../Api/user/index'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function UserManageTable() {
    
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const UserList = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getUserList();
            setUserList(response.data)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        UserList()
    }, [])

    //modal state 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //pagination 
    const [searchParams,setSearchParams]=useSearchParams()
    const currentPage=Number(searchParams.get("page")) || 1;
    const userPerPage=5;
    const indexOfFirstUser=(currentPage-1) * userPerPage; //0 5
    const indexOfLastUser=currentPage * userPerPage; //5 10
    const slicedUsers=userList.slice(indexOfFirstUser,indexOfLastUser);
    const numberOfPages=Math.ceil(userList.length / userPerPage);
    
    const handlePageChange=(newPage)=>{
        setSearchParams({page:newPage})
    }
    
    return (
        <>
                <div>
                    <p className="p-3 font-semibold">Users</p>
                    <hr />
                    <div className="controls p-3 ">
                        <div className="search-filter w-full">
                            <input
                                type="search"
                                placeholder="search name"
                                className="search-input "
                            />
                            <input type="search" placeholder='search email' className='search-input' />
                            <select name="" id="" className="border-2 rounded-lg text-gray-400 select outline-none">
                                <option value="" disabled selected hidden >Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select name="" id="" className="border-2 rounded-lg text-gray-400 select outline-none">
                                <option value="" disabled selected hidden >Status</option>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                        
                        </div>
                    </div>
                </div>

            {loading ? (
                <p className="text-center text-gray-500">Downloading...</p> // Loading message
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : slicedUsers && slicedUsers.length > 0 ? ( // Render table only if data exists and isn't empty
               <>
                <table className="faq-table">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>gender</th>
                            <th>status</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slicedUsers.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{item.status}</td>
                                <td className="flex gap-2 ">
                                    <img src={Edit} alt="" onClick={openModal} className='hover:cursor-pointer' />
                                    <img src={Bin} alt="" className='hover:cursor-pointer' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='pagination mt-10  flex gap-4 justify-center items-center'>
                    <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1}  className="py-1 px-2  bg-custom-red text-white rounded-md mt-3 transition-all .2s ease-in-out  hover:bg-red-500">Previous</button>
                     <span className='font-poppin'>{currentPage} of {numberOfPages}</span>
                    <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage===numberOfPages} className="py-1 px-2     bg-custom-red text-white rounded-md mt-3 transition-all .2s ease-in-out  hover:bg-red-500">Next</button>
                </div>

               </>
                
            ) : (
                <p className="text-center text-gray-500">There is no user</p>
            )}

            <Modal isOpen={isModalOpen}>
                <div className="flex justify-between">
                    <span className="font-poppin font-medium text-lg">Edit User</span>
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
            </Modal>
        </>
    );

}