const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const likeController = require('../controllers/likeController')

const router = new Router()


router.post('/', authMiddleware, likeController.likeArticle)
router.delete('/:id', authMiddleware, likeController.unlikeArticle)




module.exports = router