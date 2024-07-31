const productModel = require('../models/products');
const cuid = require('cuid');

const getAllProducts = async (req, res, next) => {
    const search = req.query.search;

    if (!search) {
        try {

            const [result] = await productModel.getAllProducts();
            return res.status(200).json({message: "Successfully retreived all products!", data: result});
       } catch (error) {
           res.status(500).json({
               message: error.message,
               data:[]
           });
       }
    } else {
        next();
    }
 }

 const searchProduct = async (req, res) => {
    const search = req.query.search;

    try {
        if (!search) return res.status(400).json({message: "No search query found!"});
        const [result] = await productModel.searchProduct(search);
        return res.status(200).json({message: "Successfully retreived product(s)!", data: result});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
 }

 const getProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        if (!productId) return res.status(400).json({message: "No product Id found in request!"});
         const [result] = await productModel.getProduct(productId);
         return res.status(200).json({message: "Successfully retreived product!", data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
 }

 const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const image = req.file.filename;
    const body = req.body;

    try {
        if (!productId) return res.status(400).json({message: "No product Id found in request!"});
        if (!image) return res.status(400).json({message: "No product image found in request!"});
        body.image = image;
        body.id = productId
        await productModel.updateProduct(body);
        return res.status(200).json({message: "Successfully updated product!", data: body});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
 }

 const addProduct = async (req, res) => {
    const image = req.file.filename;
    const body = req.body;

    try {
        if (!image) return res.status(400).json({message: "No product image found in request!"});
        body.image = image;
        body.id = cuid();
        await productModel.addProduct(body);
        return res.status(200).json({message: "Successfully added product!", data: body});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
 }

 const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        if (!productId) return res.status(400).json({message: "No product Id found in request!"});
        await productModel.deleteProduct(productId);
        return res.status(200).json({message: "Successfully deleted product(s)!", data: []});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
 }


module.exports = {
    getAllProducts,
    searchProduct,
    deleteProduct,
    getProduct,
    updateProduct,
    addProduct,
}