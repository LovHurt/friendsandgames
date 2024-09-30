const router = require("express").Router()
const { createCategory, deleteCategory, getCategoriesWithSubcategories } = require("./controller")

router.post('/category', createCategory)
router.delete('/category/:id', deleteCategory)
router.get('/category', getCategoriesWithSubcategories)

module.exports = router