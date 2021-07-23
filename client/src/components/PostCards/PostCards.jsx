import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import PostCard from "../PostCard/PostCard";


const PostCards = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        const allPosts = await getPosts();
        setPosts(allPosts);
        };
        fetchPosts();
    }, []);

    const CARDS = posts
        .reverse()
        .map((post, index) =>
        index < 8 ? (
            <PostCard
            _id={post._id}
            name={post.name}
            imgURL={post.imgURL}
            key={index}
            />
        ) : null
        );

    return (
        <div className="post-cards">
        <div className="latest">LATEST</div>
        <div className="cards">{CARDS}</div>
        </div>
    );
    };

export default PostCards;
