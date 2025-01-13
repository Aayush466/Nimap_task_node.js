import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required.");
  }

  const category = new Category({ name });
  await category.save();

  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully."));
});

export const ReadAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories.length) {
    throw new ApiError(404, "No categories found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, categories, "All categories retrieved successfully.")
    );
});

export const UpdateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const category = await Category.findByIdAndUpdate(id, updates, { new: true });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully."));
});

export const DeleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully."));
});
