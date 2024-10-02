const router = require("express").Router()
const { createPlatformOfGame, deletePlatformOfGame, getPlatformOfGames } = require("./controller")

router.post('/platformOfGame', createPlatformOfGame)
router.delete('/platformOfGame/:id', deletePlatformOfGame)
router.get('/platformOfGame', getPlatformOfGames)

module.exports = router