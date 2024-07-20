
const {Comment} = require('../models/models')
class CommentController{
    async create(req, res){
        let {articleId, description} = req.body
        articleId = +articleId
        console.log(req.body)
        const userId = +req.user.id
        console.log(articleId)
        if(!articleId || !userId || !description){
            return res.status(400).json({error:'Все поля обязательны'})
        }

        try {
            const comment = await Comment.create({description, userId, articleId})
            return res.json(comment)
        } catch (error) {
            console.error('Error creating comment')
            res.status(500).json({error: 'Internal server error'})
        }
        
        
    }

    async getOne(req, res){
        const comment = await Comment.findOne()
        return 
    }

    async getAll(req, res){
        const comments = await Comment.findAll()
        return res.json(comments)
    }
}


module.exports = new CommentController()