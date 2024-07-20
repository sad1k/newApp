const Router = require('express')

const router = new Router()
const articleController = require('../controllers/articleController')
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', authMiddleware, commentController.create)



module.exports = router

