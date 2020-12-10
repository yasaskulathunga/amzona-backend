import express from 'express';
import data from "./data";
import config from './config';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import bodyParser from 'body-parser' 

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
//start create database connection
mongoose.connect(mongodbUrl,{ 
    useNewUrlParser:true,  
    useCreateIndex:true,
    useUnifiedTopology:true,
    
}).catch(error => console.log(error.reason));


const app =express();

app.use(bodyParser.json({limit: '1mb'}));  
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find( x => x._id === productId);
//     if(product)
//     res.send(product);
//     else 
//     res.status(404).send({ msg:"Product Not Found"})
// });


// app.get("/api/products", (req, res)=>{
//     res.send(data.products);
// });

app.listen(5000,() =>{console.log("Server is at http://localhost:5000")} )