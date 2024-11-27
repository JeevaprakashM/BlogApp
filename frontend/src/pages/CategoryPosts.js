import Post from "../components/Post";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(null);
    const { id } = useParams();
    
    const fetchPosts = async () => {
        const response = await axios.get(`https://blogapp-backend-i8a4.onrender.com/api/posts/category/${id}`);
        setPosts(response.data);
    };
    
    const fetchCategory = async () => {
        const response = await axios.get(`https://blogapp-backend-i8a4.onrender.com/api/categories/${id}`);
        setCategory(response.data);
    };

    useEffect(() => {
        fetchPosts();
        fetchCategory();
    }, [id]);

    if (!category) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <main>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1 className="mb-4">{category.name}</h1>
                            {posts.length > 0 ? (
                                posts.map((post) => <Post key={post.id} post={post} />)
                            ) : (
                                <h3>No Posts Available</h3>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
