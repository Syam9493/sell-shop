import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
   

    // @desc Fetch all products
    // @route GET/api/products
    //@acces Public

    const getProducts = asyncHandler(async(req,res)=>{
        const products = await Product.find({});
        res.json(products);
    });
      
    // @desc Fetch a product
    // @route GET/api/products/:id
    //@acces Public

    const getProductById = asyncHandler(async(req,res)=>{
        const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource Not Found');
    }
    });

    // @desc create a product
    // @route POST/api/products
    //@acces Private/Admin

    const createProduct = asyncHandler(async(req,res)=>{
        const product = new Product({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'sample brand',
            category: 'Sample Category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        })

        const createProduct = await product.save();
        res.status(200).json(createProduct);
        
    });

    // @desc Update  a product
    // @route PUT/api/products
    //@acces Private/Admin

    const updateProduct = asyncHandler(async(req,res)=>{
       const {name, price, description, image, brand, category, countInStock} = req.body;
      
       const product = await Product.findById(req.params.id);

       if(product) {
           product.name = name;
           product.price = price;
           product.description = description;
           product.image = image;
           product.brand = brand;
           product.category = category;
           product.countInStock = countInStock;
           
           const updatedProduct = await product.save();

           res.status(200).json(updateProduct);

       } else {
        res.status(404);
        throw new Error('Resource not found');
       }
    });

    // @desc Delete  a product
    // @route DELETE/api/products
    //@acces Private/Admin

    const deleteProduct = asyncHandler(async(req,res)=>{
       
        const product = await Product.findById(req.params.id);
 
        if(product) {
            await Product.deleteOne({_id: product._id});
            res.status(200).json({message: 'Prouct deleted'});
        } else {
         res.status(404);
         throw new Error('Resource not found');
        }
     });
 


    export {getProducts, getProductById, createProduct, updateProduct, deleteProduct};