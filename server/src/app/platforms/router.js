const router = require("express").Router()
const { createPlatform, deletePlatform, getPlatforms } = require("./controller")

router.post('/platform', createPlatform)
router.delete('/platform/:id', deletePlatform)
router.get('/platform', getPlatforms)

module.exports = router