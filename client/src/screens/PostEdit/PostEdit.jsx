import { useState, useEffect } from "react";
import "./PostEdit.css";
import { useParams, Redirect } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getPost, updatePost } from "../../services/posts";

const PostEdit = (props) => {
    const [post, setPost] = useState({
        name: "",
        description: "",
        imgURL: "",
        price: "",
    });

    const [isUpdated, setUpdated] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
        const post = await getPost(id);
        setPost(post);
        };
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost({
        ...post,
        [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updated = await updatePost(id, post);
        setUpdated(updated);
    };

    if (isUpdated) {
        return <Redirect to={`/posts/${id}`} />;
    }

    return (
        <Layout>
        <div className="post-edit">
            <div className="image-container">
            <img className="edit-post-image" src={post.imgURL} alt={post.name} />
            <form onSubmit={handleSubmit}>
                <input
                className="edit-input-image-link"
                placeholder="Image Link"
                value={post.imgURL}
                name="imgURL"
                required
                onChange={handleChange}
                />
            </form>
            </div>
            <form className="edit-form" onSubmit={handleSubmit}>
            <input
                className="input-name"
                placeholder="Name"
                value={post.name}
                name="name"
                required
                autoFocus
                onChange={handleChange}
            />
            <input
                className="input-price"
                placeholder="Price"
                value={post.price}
                name="price"
                required
                onChange={handleChange}
            />
            <textarea
                className="textarea-description"
                rows={10}
                cols={78}
                placeholder="Description"
                value={post.description}
                name="description"
                required
                onChange={handleChange}
            />
            <button type="submit" className="save-button">
                Save
            </button>
            </form>
        </div>
        </Layout>
    );
    };

export default PostEdit;
