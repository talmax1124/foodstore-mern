const express = require('express')
const {
  categoryCreate,
  CategoryList,
  categoryById,
  categoryUpdate,
  categoryDelete,
} = require('../controllers/categoryControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/category')
  .post(protect, adminCheck, categoryCreate)
  .get(CategoryList)
router
  .route('/category/:slug')
  .get(categoryById)
  .put(protect, adminCheck, categoryUpdate)
  .delete(protect, adminCheck, categoryDelete)

module.exports = router