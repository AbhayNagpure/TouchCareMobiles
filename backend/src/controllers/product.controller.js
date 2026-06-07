import {Product} from "../models/Product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {

    const product  = await Product.create(req.body);

    res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
})

export const getAllProducts = asyncHandler(async (req, res) => {
    //we only wants to show available products to public only.
    let query = {isAvailable: true};
    
    if(req.query.category){
        query.category = req.query.category;
    }

    const products = await Product.find(query).sort({createdAt: -1});

    res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfuly")
    )
})

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(!product){
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json(
        new ApiResponse(200, product, "product fetched successfuly")
    )

})

export const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if(!product) {
        throw new ApiError(404, "product not found")
    }

    res.status(200).json(
        new ApiResponse(200, product, "Product updated successfully")
    );


})

export const deleteProduct = asyncHandler(async (req, res) => {
    //Soft delete; we just mark it is unavailabel

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {isAvailable: false},
        {new: true}
    );

    if(!product){
        throw new ApiError(404, "product not found");
    }

    res.status(200).json(
        new ApiResponse(200, null, "product removed from store successfully")
    )
    

})