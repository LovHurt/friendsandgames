const router = require("express").Router()
const { createMedia, deleteMedia, getMedias } = require("./controller")

router.post('/media', createMedia)
router.delete('/media/:id', deleteMedia)
router.get('/media', getMedias)

module.exports = router