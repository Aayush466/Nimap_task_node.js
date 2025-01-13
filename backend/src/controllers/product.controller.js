import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    throw new ApiError(400, "Name and category are required.");
  }

  const product = new Product({
    name,
    category,
  });

  await product.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, product, "Product has been created successfully.")
    );
});
export const GetProductWithPagination = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const products = await Product.find()
    .populate("category", "name")
    .skip(skip)
    .limit(pageSize);

  const total = await Product.countDocuments();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products, total, page, pageSize },
        "Products retrieved successfully"
      )
    );
});

export const UpdateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const product = await Product.findByIdAndUpdate(id, updates, { new: true });

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully."));
});

export const DeleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully."));
});
