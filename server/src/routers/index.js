const router = require("express").Router()
const multer = require("multer")
const upload = require("../middlewares/lib/upload")
const APIError = require("../utils/errors")
const Response = require("../utils/response")

const auth = require("../app/auth/router")
const user = require("../app/users/router")
const category = require('../app/categories/router')
const platform = require("../app/platforms/router")
const platformOfGame = require("../app/platformOfGames/router")
const game = require("../app/games/router")
const downloadLink = require("../app/downloadLinks/router")
const media = require("../app/medias/router")
const categoryOfGame = require("../app/categoryOfGames/router")

router.use(auth)
router.use(user)

router.use(category)
router.use(game)
router.use(platform)
router.use(platformOfGame)
router.use(downloadLink)
router.use(media)
router.use(categoryOfGame)
router.use(downloadLink)

module.exports = router