const router = require("express").Router()
const { createDownloadLink, deleteDownloadLink, getDownloadLinks } = require("./controller")

router.post('/downloadLink', createDownloadLink)
router.delete('/downloadLink/:id', deleteDownloadLink)
router.get('/downloadLink', getDownloadLinks)

module.exports = router