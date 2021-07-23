import { Link } from "react-router-dom";


const PostCard = (props) => {
    return (
        <div className="post-card">
        <Link className="card" to={`/posts/${props._id}`}>
            <img className="post-card-imade" src={props.imgURL} alt={props.name} />
            <p>View</p>
        </Link>
        </div>
    );
};

export default PostCard;