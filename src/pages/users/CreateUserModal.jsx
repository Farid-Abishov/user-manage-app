import Modal from "../../components/modal/Modal";
import CancelIcon from '../../assets/icons/cancel.png'
import { useCreateUserMutation, userApi } from "../../store/api/user.api";
import { useState } from "react";
import { useDispatch } from "react-redux";

const createUserInitialState = {
    name: "",
    email: "",
    gender: "",
    status: ""
}

export default function CreateUserModal({ isOpen, closeModal }) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(createUserInitialState)

    const [createUser, createUserFlags] = useCreateUserMutation()


    const updateUser = (key, value) => {
        setUser((prev) => ({ ...prev, [key]: value }))
    }

    const saveUser = async () => {
        try {
            await createUser(user).unwrap();
            closeModal()

           dispatch(userApi.util.invalidateTags(['getUsers']))
        } catch (err) {
            alert(`${err.data[0].field} ${err.data[0].message}`)
        }
    }

    return <Modal isOpen={isOpen}>
        <div className="flex justify-between">
            <span className="font-poppin font-medium text-lg ">Add User</span>
            <img src={CancelIcon} onClick={closeModal} className='hover:cursor-pointer' alt="" />
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="w-full">
                <div className="mt-2">
                    <p>Name</p>
                    <input type="text" value={user.name} onChange={(e) => updateUser('name', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='name' />
                </div>
                <div className="mt-2">
                    <p>Email</p>
                    <input type="email" value={user.email} onChange={(e) => updateUser('email', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='email' />
                </div>
                <div className="mt-2">
                    <p>Gender</p>
                    <select value={user.gender} onChange={(e) => updateUser('gender', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mt-2">
                    <p>Status</p>
                    <select value={user.status} onChange={(e) => updateUser('status', e.target.value)} className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button onClick={saveUser} className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-3">{createUserFlags.isLoading ? `...` : 'Save'}</button>
            </div>
        </div>
    </Modal>
}