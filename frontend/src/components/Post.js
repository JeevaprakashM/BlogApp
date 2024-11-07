import {Link } from 'react-router-dom';



export default function Post({post}){
    return <div class="card mb-4">
    <div className="row">
        <div className="col-sm-12 col-md-3">
            <img className="img-fluid h-100 card-img-top" src={post.image}/>
        </div>
        <div className="card-body col-md-8">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content.substr(0,50)}...</p>
            <Link to={`/posts/${post._id}`} class="btn btn-primary">Read More</Link>
        </div>
    </div>

</div>
}