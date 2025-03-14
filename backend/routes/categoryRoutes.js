const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Routes cho category
router.route("/")
  .get(getCategories)
  .post(protect, admin, createCategory);

router.route("/:id")
  .get(getCategoryById)  // Lấy thông tin category theo ID
  .put(protect, admin, updateCategory)  // Cập nhật thông tin category
  .delete(protect, admin, deleteCategory);  // Xóa category

module.exports = router;
