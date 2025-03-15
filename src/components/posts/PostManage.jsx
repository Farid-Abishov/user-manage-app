import Bin from '../../assets/icons/Bin.svg'
import Edit from '../../assets/icons/Edit.svg'
import CancelIcon from '../../assets/icons/cancel.png'
import Modal from '../modal/Modal'
import { getPostList } from '../../Api/posts'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PostManageTable() {
    const [postList, setPostList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPostList = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getPostList();
            setPostList(response.data)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPostList()
    }, [])


    
    // Modal State
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
    const PostPerPage=3;
    const indexOfFirstPost=(currentPage-1) * PostPerPage; 
    const indexOfLastPost=currentPage * PostPerPage; 
    const slicedPosts=postList.slice(indexOfFirstPost,indexOfLastPost);
    const numberOfPages=Math.ceil(postList.length / PostPerPage);
    
    const handlePageChange=(newPage)=>{
        setSearchParams({page:newPage})
    }
    return (
        <div >
            <div>
                <p className="p-3 font-semibold">Posts</p>
                <hr />
                <div className="controls p-3 " >
                    <div className="search-filter w-full">
                        <input type="search"  placeholder="search id"  className="search-input" />
                        <input type="search"  placeholder="search user id"  className="search-input" />
                    <input type="search" placeholder='search title' className='search-input' />
                    </div>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Downloading...</p> 
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : postList && postList.length > 0 ? ( 
              <>
                <table className="table">
                    <thead className="bg-gray-100 " >
                        <tr>
                            <th>id</th>
                            <th>user_id</th>
                            <th>title</th>
                            <th>body</th>
                            <th>comments</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slicedPosts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.user_id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td></td>
                                <td className="flex gap-2">
                                    <img src={Edit} alt="" onClick={openModal} className='hover:cursor-pointer' />
                                    <img src={Bin} alt="" className='hover:cursor-pointer' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pagination  flex gap-5 justify-center items-center '>
                    <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1}  className="px-2  py-1  bg-custom-red text-white rounded-md mt-3 hover:bg-red-500">Previous</button>
                     <span className='font-poppin'>{currentPage} of {numberOfPages}</span>
                    <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage===numberOfPages} className="px-2 py-1  bg-custom-red text-white rounded-md mt-3 hover:bg-red-500">Next</button>
                </div>
              </>
            ) : (
                <p className="text-center text-gray-500">There is no post</p>
            )}

<Modal isOpen={isModalOpen}>
                <div className="flex justify-between">
                    <span className="font-poppin font-medium text-lg">Edit Post</span>
                    <img src={CancelIcon} onClick={closeModal} className='hover:cursor-pointer' alt="" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full">
                      
                        <div className="mt-2">
                            <p>Id</p>
                           <input type="number" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='id' />
                        </div>
                        <div className="mt-2">
                            <p>User Id</p>
                           <input type="number" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='user id' />
                        </div>
                        <div className="mt-2">
                            <p>Title</p>
                           <input type="text"  className="my-2 w-full rounded-lg bg-input-border p-4 outline-none" placeholder='title' />
                        </div>
                        <div className="mt-2">
                            <p>Body</p>
                            <input type="text" className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"  placeholder='body'/>
                        </div>
                      
                        <button className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-3">Save</button>
                    </div>
                </div>
            </Modal>

          
        </div>
    );

}
