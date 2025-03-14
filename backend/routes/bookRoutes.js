const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
} = require("../controllers/bookController");
const { protect, admin } = require("../middlewares/authMiddleware");
const { getBooksByCategory } = require('../controllers/bookController');

// Routes for books
router.get("/", getBooks);
router.post("/", protect, admin, createBook);
router.post("/:id/reviews", protect, createBookReview);
router.get("/top", getTopBooks);
router.get("/:id", getBookById);
router.delete("/:id", protect, admin, deleteBook);
router.put("/:id", protect, admin, updateBook);

router.get('/categories/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;  // Bắt categoryId từ URL

  // Kiểm tra categoryId có hợp lệ không
  if (!categoryId) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  try {
    // Lấy danh sách sách theo categoryId từ controller
    const books = await getBooksByCategory(categoryId);

    // Nếu không có sách nào, trả về thông báo
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this category' });
    }

    res.json(books);  // Trả lại danh sách sách dưới dạng JSON
  } catch (err) {
    console.error("Error in the GET request:", err);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

module.exports = router;
