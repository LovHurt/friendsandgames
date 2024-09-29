const router = require("express").Router()
const multer = require("multer")
const upload = require("../middlewares/lib/upload")
const APIError = require("../utils/errors")
const Response = require("../utils/response")

const auth = require("./app/auth/router")
const user = require("./app/users/router")

router.use(auth)
router.use(user)


module.exports = router