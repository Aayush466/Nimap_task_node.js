import { Router } from "express";

import {createCategory , ReadAllCategory , UpdateCategory , DeleteCategory} from '../controllers/category.controller.js'
const router = Router()

router.route("/create-category").post(createCategory)
router.route("/categorys").get(ReadAllCategory)
router.route("/update-category").patch(UpdateCategory)
router.route("/delete-category").delete(DeleteCategory)
export default router