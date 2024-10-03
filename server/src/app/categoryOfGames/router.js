const router = require("express").Router()
const { createCategory, deleteCategory, getCategorys, createCategoryOfGame, deleteCategoryOfGame, getCategoryOfGames } = require("./controller")

router.post('/categoryOfGame', createCategoryOfGame)
router.delete('/categoryOfGame/:id', deleteCategoryOfGame)
router.get('/categoryOfGame', getCategoryOfGames)

module.exports = router