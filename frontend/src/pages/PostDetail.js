import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function  PostDetail(){

    const [post,setpost]= useState(null);
    const { id }= useParams();
   
         const fetchPost=async ()=> {
            try{
              const response=  await axios.get(`https://blogapp-backend-i8a4.onrender.com/api/posts/${id}`);
              setpost(response.data);

            }
            catch(err)
            {
             console.log('Error fetching post:',err)
            }
        }
        useEffect(()=> {
            fetchPost();
       },[])
       if(!post)
       {
        return <p> Loading...</p>
       }
      const formatedDate= Intl.DateTimeFormat('en-Us',{
        month:'long',
        day:"numeric",
         year:"numeric"
       }).format(new Date(post.createdAt))
    return <main className="container my-4">
    <div className="row">
        <article className="col-lg-8">
            <h2 className="blog-post-title">{post.title}</h2>
            <p className="blog-post-meta">{formatedDate} <a href="#">{post.author}</a></p>

            <img className="mb-3 img-fluid" src={post.image} alt=""/>
           
            <div className="blog-post-content">
                <p>{post.content}</p>

            </div>
        </article>

    </div>
</main>

}