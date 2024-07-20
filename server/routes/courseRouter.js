const Router = require('express')


const router = new Router()
const courseController = require('../controllers/courseController')
const fileMiddleware = require('../middleware/fileMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/:id', courseController.getOne)
router.get('/', courseController.getAll)
router.post('/create', fileMiddleware.single('img'), authMiddleware,  courseController.create)


module.exports = router
