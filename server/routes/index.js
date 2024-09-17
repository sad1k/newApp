const Router = require('express')

const router = new Router()

const articleRouter = require('./articleRouter')
const userRouter = require('./userRouter')
const commentRouter = require('./commentRouter')
const likeRouter = require('./likeRouter')
const courseRouter = require('./courseRouter')
const createCourserouter = require('./createCourseRouter')

router.use('/user', userRouter)
router.use('/article', articleRouter)
router.use('/comment', commentRouter)
router.use('/like', likeRouter)

router.use('/createCourse' ,createCourserouter)

module.exports = router