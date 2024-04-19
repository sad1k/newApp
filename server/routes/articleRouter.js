const Router = require('express')

const router = new Router()
const articleController = require('../controllers/articleController')

router.post('/create', articleController.create)
router.get('/', articleController.getAll)
router.get('/:id', articleController.getOne)

module.exports = router