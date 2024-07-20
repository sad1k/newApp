const Router = require('express')

const router = new Router()
const articleController = require('../controllers/articleController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/', articleController.getAll)
router.get('/:id', articleController.getOne)
router.post('/create' ,authMiddleware,  articleController.create)

module.exports = router