import Post from "../components/Post";
import {useEffect, useState} from 'react';
import  axios from 'axios' //api request annupuradhukana oru module
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
export default function PostList()
{
    const [posts,setposts]=useState([]);
	const [category,setCategory]=useState(null)
     const {id}=useParams() 
    const fetchPosts= async () =>{ 
      const response= await  axios.get(`http://localhost:8000/api/posts/category/${id}`)
      setposts(response.data);

    }
	const fetchCategory =async () =>{ 
		const response= await  axios.get(`http://localhost:8000/api/categories/${id}`)
		setCategory(response.data);

	}

    useEffect(()=> {
        fetchPosts();
		fetchCategory();

    },[])
<<<<<<< HEAD
    if(!category)
        {
         return <p> Loading...</p>
        }
=======
	if(!category)
	{
		return <p> Loading...</p>
	}
>>>>>>> 3171e52e40ceec0d5eac569a4b65c8884b89f26f
    return <>
    <main>
        <div class="container mt-4">
            <div class="row">
                
                <div class="col-lg-8">
                    <h1 class="mb-4">{category.name}</h1>
<<<<<<< HEAD
                    {
                        posts.length> 0 ? posts.map((post) => <Post post={post}/>) : <h3> No Posts Available</h3>
                    }
=======

                   
                    <div class="card mb-4">
						<div class="row">
							
							<div class="card-body col-md-8">
							<h1 class="mb-4">{category.name}</h1>
                                                          {
                                                         posts.length> 0 ? posts.map((post) => <Post post={post}/>) : <h3> No Posts Available</h3>
                                                         }	
							</div>
						</div>

					</div>
>>>>>>> 3171e52e40ceec0d5eac569a4b65c8884b89f26f

                 


                </div>

               
            </div>
        </div>
    </main>

	

    </>
}
