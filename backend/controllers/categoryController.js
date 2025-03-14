const asyncHandler = require("express-async-handler");
const { Category } = require("../models/categoryModel");

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Fetch a single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = new Category({
    name,
    description,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.findByIdAndDelete(req.params.id);  // Thay thế remove() bằng findByIdAndDelete()
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

module.exports = {
  getCategories,
  getCategoryById, 
  createCategory,
  updateCategory,
  deleteCategory,
};
