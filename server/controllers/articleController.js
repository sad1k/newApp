const {Article, ArticleInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
class ArticleController{
    async create(req, res, next){
        try{
            const {title, description, svg_interactivity, articleId} = req.body

            const articleInfo = await ArticleInfo.create({title, description, svg_interactivity, articleId})
            return res.json(articleInfo)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
      
    }

    async getAll(req, res){
        const articles = await Article.findAll()
        return res.json(articles)
    }

    async getOne(req, res){
        const {id} = req.params

        const article = await Article.findOne(
            {
            where: {id}
            
        })
        return res.json(article)
    }
}

module.exports = new ArticleController()