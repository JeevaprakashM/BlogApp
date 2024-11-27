const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const postRoutes=require('./routes/post');
const categoryRoutes=require('./routes/categories');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 8000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
mongoose.connect('mongodb+srv://jeevaprakashm2021ecea:root@cluster0.63utv.mongodb.net/')
.then(()=> console.log('MongoDB Connected'))  
.catch(err=> console.log("DB error",err));

//Use Routes
app.use('/api/posts',postRoutes);
app.use('/api/categories',categoryRoutes);

app.listen(PORT,()=> console.log(`Server Running on port ${PORT}`));



