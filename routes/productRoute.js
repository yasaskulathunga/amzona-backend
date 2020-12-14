import express from 'express';
import Product from '../models/productModel';
import {getToken, isAdmin, isAuth} from '../util'

const router = express.Router();

router.get("/" , async(req,res) => {
    const products = await Product.find({});
    res.send(products);

});

router.get("/:id", async(req, res) => {
    const productId = req.params.id;
    const product= await Product.findOne({_id:productId});
    
    if(product)
    res.send(product);
    else 
    res.status(404).send({ msg:"Product Not Found"})
});

//product save
router.post("/" , async(req,res) =>{
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        brand:req.body.brand,
        category:req.body.category,
        countInStock:req.body.countInStock,
        description:req.body.description,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message:'New Product Created', data: newProduct});
    }
    return res.status(500).send({massage:'Error in Creating Product'});
});


//product update
router.put ("/:id" ,isAuth,isAdmin, async(req,res) =>{
    const productId = req.params.id;
    console.log(productId);
    const product= await Product.findOne({_id:productId});
    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.image=req.body.image;
        product.image=req.body.image;
        product.brand=req.body.brand;
        product.category=req.body.category;
        product.countInStock=req.body.countInStock;
        product.description=req.body.description;
    
        const UpdatedProduct = await product.save();
        if(UpdatedProduct){
            return res.status(200).send({message:' Product Updated', data: UpdatedProduct});
        }
        
        }
        return res.status(500).send({massage:'Error in Updating Product'});
   
    
});

//product delete
router.delete("/:id",isAuth,isAdmin, async(req, res) => {
    const productId = req.params.id;
    const deleteProduct= await Product.findById(productId);
    
    if(deleteProduct){
    await deleteProduct.remove();
    res.send({msg:"Product Deleted"});
    }
    else 
    res.send({ msg:"Product Not Deleted"})
});


export default router;