import Post from "../components/Post";
import {useEffect, useState} from 'react';
import  axios from 'axios' //api request annupuradhukana oru module
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
export default function PostList()
{
    const [posts,setposts]=useState([]);
	const [categories,setCategories]=useState([])
     const {id}=useParams() 
    const fetchPosts= async () =>{ 
      const response= await  axios.get(`http://localhost:8000/api/posts/category/${id}`)
      setposts(response.data);

    }
	const fetchCategories =async () =>{ 
		const response= await  axios.get('http://localhost:8000/api/categories')
		setCategories(response.data);

	}

    useEffect(()=> {
        fetchPosts();
		fetchCategories();

    },[])
    return <>
    <main>
        <div class="container mt-4">
            <div class="row">
                
                <div class="col-lg-8">
                    <h1 class="mb-4">Category 1</h1>

                   
                    <div class="card mb-4">
						<div class="row">
							<div class="col-sm-12 col-md-3">
								<img class="img-fluid h-100" src="https://via.placeholder.com/800x400"
									 alt="..."/>
							</div>
							<div class="card-body col-md-8">
								<h5 class="card-title">Post Title 1</h5>
								<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								<a href="#" class="btn btn-primary">Read More</a>
							</div>
						</div>

					</div>

                 


                </div>

               
            </div>
        </div>
    </main>

	

    </>
}