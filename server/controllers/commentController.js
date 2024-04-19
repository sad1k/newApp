
const {Comment} = require('../models/models')
class CommentController{
    async create(req, res){
        const {author, description} = req.body
        const comment = await Comment.create({author, description})
        return req.json(comment)
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