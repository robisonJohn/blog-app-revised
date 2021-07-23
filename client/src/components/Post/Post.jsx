import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <div>
        <Link className="post" to={`/posts/${props._id}`}>
            <img
            className="post-image"
            src={
                "http://www.thebyersfamily.net/family/wp-content/uploads/2014/03/blog-coffee.jpg"
            }
            alt={props.title}
            />
            <div className="post-title">{props.title}</div>
        </Link>
        </div>
    );
};
export default Post;