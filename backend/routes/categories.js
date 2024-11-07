const express =require('express');//It is required beacuse we need router fucntion which is in express.
const router=express.Router();
const Category=require('../models/Category')
//Category API End Points
//Get All Category
router.get('/',async(req,res)=>{
    try{
     const categories=await Category.find();
     res.json(categories)
    }
    catch(err)
    {
        res.status(500).json({message:err.message})

    }
})

//Get A Single Category By Id:

router.get('/:id',async(req,res)=>{
    try{
      const category=await Category.findById(req.params.id);
      if(!category)
    {
        return res.status(404).json({message:"Category not found"});
    }
    res.json(category);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});   
    }
})

//Creating a new Category

router.post('/',async(req,res)=>{
    const category=new Category({
       name:req.body.name,
       slug:req.body.slug,
       description:req.body.description,
    });
    try{
      const newCategory=await category.save();
      res.status(201).json(newCategory);
    }
    catch(err)
    {
       res.status(400).json({message:err.message})
    }
})

//update an existing category
router.put('/:id',async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        if(!category){
          return res.status(404).json({message:'Category not found'})
      }


      category.name =req.body.name || category.name;
      category.slug =req.body.slug || category.slug;
      category.description =req.body.name || category.description;
      category.updatedAt=Date.now();
      const UpdatedCategory=await category.save();
      res.json(UpdatedCategory);
    }
    catch{
        res.status(400).json({message:err.message});
    }
})


//Delete A Post 


router.delete('/:id',async(req,res)=>{
    try{
        const category=await Category.findById(req.params.id);
        if(!category)
      {
          return res.status(404).json({message:"Post not found"});
      }
      //await Category.deleteOne({_id:post._id})
       await Category.findByIdAndDelete(category._id);
       res.json({message:"Category Deleted"})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})
module.exports =router;