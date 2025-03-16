import Modal from "../../components/modal/Modal";
import CancelIcon from '../../assets/icons/cancel.png';
import { useCreatePostMutation, postApi } from "../../store/api/post.api";
import { useState } from "react";
import { useDispatch } from "react-redux";

const createPostInitialState = {
    user_id: "",
    title: "",
    body: "",
};

export default function CreatePostModal({ isOpen, closeModal }) {
    const dispatch = useDispatch();
    const [post, setPost] = useState(createPostInitialState);
    const [createPost, createPostFlags] = useCreatePostMutation();

    const updatePost = (key, value) => {
        setPost((prev) => ({ ...prev, [key]: value }));
    };

    const savePost = async () => {
        if (!post.user_id || !post.title || !post.body) {
            alert("fill all field!");
            return;
        }

        try {
            await createPost(post).unwrap();
            closeModal();
            dispatch(postApi.util.invalidateTags(['getPosts']));
        } catch (err) {
            console.error("Error:", err);
            alert(err?.data?.[0]?.field ? `${err.data[0].field} ${err.data[0].message}` : "An error occurred while saving the post.");
        }
    };

  
    
    return (
        <Modal isOpen={isOpen}>
            <div className="flex justify-between">
                <span className="font-poppin font-medium text-lg">Add Post</span>
                <img src={CancelIcon} onClick={closeModal} className="hover:cursor-pointer" alt="Close" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full">
                    <div className="mt-2">
                        <p>User id</p>
                        <input
                            type="number"
                            value={post.user_id}
                            onChange={(e) => updatePost("user_id", parseInt(e.target.value) || "")}
                            className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"
                            placeholder="User ID"
                        />

                    </div>
                    <div className="mt-2">
                        <p>Title</p>
                        <input
                            value={post.title}
                            onChange={(e) => updatePost('title', e.target.value)}
                            type="text"
                            className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"
                            placeholder="Title"
                        />
                    </div>
                    <div className="mt-2">
                        <p>Body</p>
                        <input
                            value={post.body}
                            onChange={(e) => updatePost('body', e.target.value)}
                            type="text"
                            className="my-2 w-full rounded-lg bg-input-border p-4 outline-none"
                            placeholder="Body"
                        />
                    </div>
                    <button onClick={savePost} className="block mx-auto w-full bg-custom-red text-white rounded-md h-10 mt-8">
                    {createPostFlags.isLoading ? `...` : 'Save'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
