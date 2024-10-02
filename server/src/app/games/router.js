const router = require("express").Router()
const { createGame, deleteGame, getGames } = require("./controller")

router.post('/game', createGame)
router.delete('/game/:id', deleteGame)
router.get('/game', getGames)

module.exports = router