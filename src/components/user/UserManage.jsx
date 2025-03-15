import './usertable.css'
import Bin from '../../assets/icons/Bin.svg'
import Edit from '../../assets/icons/Edit.svg'
import CancelIcon from '../../assets/icons/cancel.png'
import Modal from '../modal/Modal'
import { getUserList } from '../../Api/user/index'
import { data, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDeleteUserMutation, useGetUsersInfiniteQuery, userApi, useUpdateUserMutation } from '../../store/api/user.api'

export default function UserManageTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [editUser, setEditUser] = useState(null)

    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const gender = searchParams.get("gender") || "";
    const status = searchParams.get("status") || "";


    const { data, isFetching, fetchNextPage, fetchPreviousPage, refetch, error, } = useGetUsersInfiniteQuery({ name, email, gender, status })

    const [updateUser, updateUserFlags] = useUpdateUserMutation()
    const [deleteUser,deleteUserFlags] =useDeleteUserMutation()
    //pagination
    const currentPage = data?.pageParams?.[0]
    const slicedUsers = data?.pages?.[0];


    const openEditUser = (user) => {
        setEditUser(user)
    }

    const closeEditUser = () => {
        setEditUser(null)
    }

    const updateEditUser = (key, value) => {
        setEditUser((prev) => ({ ...prev, [key]: value }))
    }

    const saveUser = async () => {
        
         await updateUser(editUser).unwrap()

         // add toast
        refetch()

        closeEditUser()
    }

    const deleteUserById= async (id)=>{
       await deleteUser(id).unwrap();

       // add toast

       refetch()
    }


    //filter user
    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    return (
        <>
            <div>
                <p className="p-3 font-semibold">Users</p>
                <hr />
                <div className="controls p-3 ">
                    <div className="search-filter w-full flex flex-row gap-2">
                        <input
                            type="search"
                            placeholder="Name"
                            className="search-input "
                            value={name}
                            onChange={(e) => handleFilterChange("name", e.target.value)}
                        />
                        <input type="text" value={email}
                            onChange={(e) => handleFilterChange("email", e.target.value)} placeholder='Email' className='search-input' />
                        <select value={gender}
                            onChange={(e) => handleFilterChange("gender", e.target.value)} className="border-2 rounded-lg text-gray-400 select outline-none">
                            <option value="" disabled  >Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select value={status} 
                            onChange={(e) => handleFilterChange("status", e.target.value)} className="border-2 rounded-lg text-gray-400 select outline-none">
                            <option value="" disabled >Status</option>
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                        </select>

                    </div>
                </div>
            </div>

            {isFetching ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Something went wrong</p>
            ) : slicedUsers && slicedUsers.length > 0 ? (
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
                                        <img src={Edit} alt="" onClick={() => openEditUser(item)} className='hover:cursor-pointer' />
                                        <img src={Bin} alt="" onClick={() => deleteUserById(item.id)} className='hover:cursor-pointer' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td>Pagination</td>
                                <td colSpan="5"> <div className='pagination  flex gap-4 justify-end items-center'>
                                    <button onClick={() => fetchPreviousPage()} disabled={currentPage === 1} className="py-1 px-2  bg-custom-red text-white rounded-md mt-3 transition-all .2s ease-in-out  hover:bg-red-500">Previous</button>
                                    <span className='font-poppin'>{currentPage}</span>
                                    <button onClick={() => fetchNextPage()} disabled={slicedUsers.length === 0} className="py-1 px-2     bg-custom-red text-white rounded-md mt-3 transition-all .2s ease-in-out  hover:bg-red-500">Next</button>
                                </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </>

            ) : (
                <p className="text-center text-gray-500">There is no user</p>
            )}

            <Modal isOpen={editUser}>
                {editUser && (<>
                    <div className="flex justify-between">
                        <span className="font-poppin font-medium text-lg">Edit User</span>
                        <img src={CancelIcon} onClick={closeEditUser} className='hover:cursor-pointer' alt="" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full">

                            <div className="mt-2">
                                <p>Id</p>
                                <input type="number" disabled={true} value={editUser.id} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='id' />
                            </div>
                            <div className="mt-2">
                                <p>Name</p>
                                <input type="text" value={editUser.name} onChange={(e) => updateEditUser('name', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='name' />
                            </div>
                            <div className="mt-2">
                                <p>Email</p>
                                <input type="email" value={editUser.email} onChange={(e) => updateEditUser('email', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='email' />
                            </div>
                            <div className="mt-2">
                                <p>Status</p>
                                <input type="text" value={editUser.status} onChange={(e) => updateEditUser('status', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='status' />
                            </div>
                            <button className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-3" onClick={saveUser}>{updateUserFlags.isLoading ? '...' : 'Save'}</button>
                        </div>
                    </div>
                </>)}
            </Modal>
        </>
    );

}