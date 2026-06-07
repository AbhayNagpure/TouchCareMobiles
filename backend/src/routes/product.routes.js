import {Router} from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {createProductSchema, updateProductSchema} from "../models/Product.model.js"

const router = Router();

//Public routes (Anyone can view product)

router.route("/").get(getAllProducts);
router.route("/:id").gat(getProductById);

//Admin ONLY routes
//Notice the middleware chain: 

router.route("/").post(verifyJWT, verifyAdmin, validate(createProductSchema), createProduct);
router.route("/:id").patch(verifyJWT, verifyAdmin, validate(updateProductSchema), updateProduct);
router.route("/:id").delete(verifyJWT, verifyAdmin, deleteProduct);

export default router;
