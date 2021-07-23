import { useState } from "react";
import "./PostCreate.css";
import Layout from "../../components/Layout/Layout";
import { Redirect } from "react-router-dom";
import { createPost } from "../../services/posts";

const PostCreate = (props) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        imgURL: "",
    });

    const [isCreated, setCreated] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost({
        ...post,
        [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const created = await createPost(post);
        setCreated({ created });
    };

    if (isCreated) {
        return <Redirect to={`/posts`} />;
    }

    return (
        <Layout>
        <form className="create-form" onSubmit={handleSubmit}>
            <input
            className="input-title"
            placeholder="Title"
            value={post.title}
            name="title"
            required
            onChange={handleChange}
            />

            <textarea
            className="text-area description"
            rows={10}
            placeholder="Description"
            value={post.description}
            name="description"
            required
            onChange={handleChange}
            />
            <input
            className="input-image-link"
            placeholder="Image Link"
            value={post.imgURL}
            name="imgURL"
            required
            onChange={handleChange}
            />
            <button type="submit" className="submit-button">
            Submit
            </button>
        </form>
        </Layout>
    );
};

export default PostCreate;