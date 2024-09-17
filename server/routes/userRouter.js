const Router = require('express')

const router = new Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')




router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/upload', fileMiddleware.single('avatar'), authMiddleware, userController.uploadAvatar)
router.get('/:id', authMiddleware, userController.getUserById)
router.put('/:id', authMiddleware, userController.updateUser)

module.exports = router