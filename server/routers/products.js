const express = require('express');
const router = express.Router();
const { createProduct, listProducts,listProduct, listProductbyfilter, removeProduct ,searchProductFiltter , updateProduct ,createImages, removeImage}  = require('../controllers/products');
const { authCheck, adminCheck} = require('../middleware/authCheck')

router.post('/product', createProduct)
router.get('/products/:count', listProducts)   //get product by id
router.delete('/product/:id',removeProduct)  //delete product by id
router.post('/productby', listProductbyfilter)   //get product by fliitter
router.post('/search/filters' , searchProductFiltter)  //search with filters
router.put('/product/:id',updateProduct)            //update product by id
router.get('/product/:id', listProduct) //list product
router.post('/images',authCheck,adminCheck, createImages)
router.post('/removeimages',authCheck,adminCheck, removeImage)


module.exports = router;