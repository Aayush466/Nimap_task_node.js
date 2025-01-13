import { Router } from "express";

import {createProduct , GetProductWithPagination, UpdateProduct , DeleteProduct} from '../controllers/product.controller.js'
const router = Router()

router.route("/create-product").post(createProduct)
router.route("/products").get(GetProductWithPagination)
router.route("/update-product").patch(UpdateProduct)
router.route("/delete-product").delete(DeleteProduct)
export default router