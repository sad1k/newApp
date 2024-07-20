
const ApiError = require('../error/ApiError');
const { Article, Course, Rating } =  require("../models/models");

class CourseController{
  async getOne(req, res, next){
    const {id} = req.params;
    try {
      const course = await Course.findOne({
        where: {id},
        include: [
          {
            model: Article,
            as: 'articles'
          },
          {
            model: Rating,
            as: 'ratings'
          }
        ]
      })
      if(!course){
        return res.status(404).json({error: 'Курс не найден'})
      }
      return res.json({course})
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  } 

  async getAll(req, res, next){
    try {
      const courses = await Course.findAll()
      
      return res.json({courses})

    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async create(req, res, next){
    const {title, description} = req.body
    const userId = req.user.id
    let path = null
    try {
      if(req.file){
        path = req.file.path
      
    
      const course = await Course.create({
        title, description, img:path, userId
      })
      return res.json({course})
    }
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
}


module.exports = new CourseController()