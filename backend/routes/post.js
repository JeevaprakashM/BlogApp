const express =require('express');//It is required beacuse we need router fucntion which is in express.
const router=express.Router();
const Category=require('../models/Category');
const Post=require('../models/Post');//Post  models is required so we importing  it here

//API END POINTS

//Get All Post
router.get('/',async(req,res)=> {
    try{
       const posts= await Post.find();//find going to return a promise so we using await .
        res.json(posts);

    }
    catch(err)
    {
        res.status(500).json({message:err.message});

        
    }
})

//Get A Single Poat By Id:

router.get('/:id',async(req,res)=>{
    try{
      const post=await Post.findById(req.params.id);
      if(!post)
    {
        return res.status(404).json({message:"Post not found"});
    }
    res.json(post);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});   
    }
})


//Creating a new Post 

router.post('/',async(req,res)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content,
        category: req.body.category,
        author:req.body.category,
        image:req.body.image,
    });
    try{
      const newPost=await post.save();
      res.status(201).json(newPost);
    }
    catch(err)
    {
       res.status(400).json({message:err.message})
    }
})

//update an existing post
router.put('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post)
      {
          return res.status(404).json({message:"Post not found"});
      }
      post.title=req.body.title || post.title;
      post.content=req.body.content || post.content;
      post.category=req.body.category || post.category;
      post.author=req.body.author || post.author;
      post.image=req.body.image|| post.image;
      post.updatedAt=Date.now();
      const UpdatedPost=await post.save();
      res.json(UpdatedPost);
    }
    catch{
        res.status(400).json({message:err.message});
    }
})


//Delete A Post 


router.delete('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post)
      {
          return res.status(404).json({message:"Post not found"});
      }
      //await Post.deleteOne({_id:post._id})
       await Post.findByIdAndDelete(post._id);
       res.json({message:"Post Deleted"})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})
// Fetch posts by category ID
router.get('/category/:categoryId',async(req,res)=>{
    try{
        const categoryId=req.params.categoryId;

        //Validate Category Id
        const categoryExists=await Category.findById(categoryId);
        if(!categoryExists)
        {
            res.status(400).json({message:'Invalid Category Id'})
        }
        //Fetch Post
        const posts=await Post.find({category:categoryId}).populate('category');
        res.status(200).json(posts)
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

module.exports =router;