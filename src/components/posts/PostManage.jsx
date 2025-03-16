import Bin from '../../assets/icons/Bin.svg'
import Edit from '../../assets/icons/Edit.svg'
import CancelIcon from '../../assets/icons/cancel.png'
import Modal from '../modal/Modal'
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useGetPostsInfiniteQuery,useUpdatePostMutation ,useDeletePostMutation } from "../../store/api/post.api";
import { useGetUserPostsInfiniteQuery } from '../../store/api/user.api';

export default function PostManageTable({userId}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [editPost, setEditPost] = useState(null);

    const title = searchParams.get("title") || "";
    const body = searchParams.get("body") || "";
 
    const { data, isFetching, fetchNextPage, fetchPreviousPage, refetch, error, } = useGetUserPostsInfiniteQuery({ title,body,userId })
     const [updatePost, updatePostFlags] = useUpdatePostMutation();
      const [deletePost, deletePostFlags] = useDeletePostMutation();

    
    const openEditPost = (post) => {
        setEditPost(post)
    }

    const closeEditPost = () => {
        setEditPost(null)
    }

    const updateEditPost = (key, value) => {
        setEditPost((prev) => ({ ...prev, [key]: value }))
    }
    const savePost = async () => {
        await updatePost(editPost).unwrap()

        refetch()

        closeEditPost ()
    }


    const deletePostById = async (id) => {
    try {
        await deletePost(id).unwrap(); 

        toast.success('Post deleted successfully!'); 

        refetch(); 
    } catch (error) {
        toast.error('Failed to delete post!');
    }
}


     
     const currentPage = data?.pageParams?.[0]
     const slicedPosts = data?.pages?.[0];
     
    
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
        <div  >
            <div className='table-header'>
                <p className="p-3 font-semibold">Posts</p>
                <hr />
                <div className="controls p-3 " >
                    <div className="search-filter w-full">
                        <input type="text" value={title} onChange={(e) => handleFilterChange("title", e.target.value)}   placeholder='Title' className='search-input' />
                        <input type="text"  value={body} onChange={(e) => handleFilterChange("body", e.target.value)}  placeholder='Body' className='search-input' />
                    </div>
                </div>
               
            </div>
            {isFetching ? (
                <p className="text-center text-gray-500">loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : slicedPosts && slicedPosts.length > 0 ? (
                <>
                    <table className="table">
                        <thead className="bg-gray-100 " >
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Body</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slicedPosts.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td className="flex gap-2">
                                        <img src={Edit} alt="" onClick={() => openEditPost(item)} className='hover:cursor-pointer' />
                                        <img src={Bin} alt="" onClick={() => deletePostById(item.id)} className='hover:cursor-pointer' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='font-semibold'>Pagination</td>
                                <td colSpan="5"> 
                                 <div className='pagination  flex gap-4 justify-end items-center '>
                                    <button onClick={() => fetchPreviousPage()} disabled={currentPage === 1} className="px-2  py-1  bg-custom-red text-white rounded-md mt-3 hover:bg-red-500">Previous</button>
                                    <span className='font-poppin'>{currentPage}</span>
                                    <button onClick={() => fetchNextPage()} disabled={slicedPosts.length === 0} className="px-2 py-1  bg-custom-red text-white rounded-md mt-3 hover:bg-red-500">Next</button>
                                </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </>
            ) : (
                <p className="text-center text-gray-500">There is no post</p>
            )}

            <Modal  isOpen={editPost}>
               {editPost && <>
                <div className="flex justify-between">
                    <span className="font-poppin font-medium text-lg">Edit Post</span>
                    <img src={CancelIcon} onClick={closeEditPost} className='hover:cursor-pointer' alt="" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full">

                        <div className="mt-2">
                            <p>Id</p>
                            <input disabled={true} value={editPost.id}  type="number" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='id' />
                        </div>
                        <div className="mt-2">
                            <p>User Id</p>
                            <input disabled={true} value={editPost.user_id} type="number" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='user id' />
                        </div>
                        <div className="mt-2">
                            <p>Title</p>
                            <input value={editPost.title} onChange={(e) => updateEditPost('title', e.target.value)}  type="text" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='title' />
                        </div>
                        <div className="mt-2">
                            <p>Body</p>
                            <textarea rows="6" value={editPost.body} onChange={(e) => updateEditPost('body', e.target.value)} type="text" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='body' />
                        </div>

                        <button className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-3" onClick={savePost}>
                          {updatePostFlags.isLoading ? '...' : 'Save'}   
                        </button>
                    </div>
                </div>
               </>}
            </Modal>


        </div>
    );

}
