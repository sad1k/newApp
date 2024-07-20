const { Like } = require("../models/models")

class LikeController{
    async likeArticle(req, res, next){
        const { articleId } = req.body
        const userId = req.user.id
        if(!articleId){
            return res.status(400).json({error: 'Все поля обязательны'})
        }

        try {
            const existingLike = await Like.findOne({articleId, userId})
            if(existingLike){
                return res.status(400).json({error: 'Вы уже поставили лайк'})
            }

            const like = await Like.create({articleId, userId})
            return res.json({like})
        } catch (error) {
            console.error('Error like server', error)
            res.status(500).json({error: 'Internal server error'})
        }
    }

    async unlikeArticle(req, res, next){
        const {id} = req.params
        const userId = req.user.userId
        if(!id){
            return res.status(400).json({error: 'Вы поставили лайк'})
        }
        try{
            const existingLike = await Like.findOne({
                where:{postId:id, userId}
            })  
            if(!existingLike){
                return res.status(400).json({error: 'Лайк уже сущ'})
            }

            const like = await Like.destroy({
                where:{postId:id, userId}
            })
            return res.json({like})
        }catch(error){
            console.error('Error unlike article', error)
            res.status(500).json({error:'Internal error server'})
        }
    }
}

module.exports = new LikeController()