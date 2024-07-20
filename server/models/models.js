const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define( 'user',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        email:{type:DataTypes.STRING, unique:true},
        password:{type:DataTypes.STRING},
        role:{type:DataTypes.STRING, defaultValue:'USER'},
        avatar: {type: DataTypes.STRING},
        bio: {type: DataTypes.STRING, allowNull:true},
        location: {type: DataTypes.STRING, allowNull:true},
    }
)

const Article = sequelize.define( 'article',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        title:{type:DataTypes.STRING, allowNull:false},
        description:{type:DataTypes.STRING, allowNull:false},
        svg_interactivity: {type:DataTypes.STRING, allowNull:false},
    }
)

const Comment = sequelize.define( 'comment',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        description:{type:DataTypes.STRING, allowNull:false},
    }
)

const Like = sequelize.define('like', 
    {
        id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true}
    }
)
// NOTE: картинка для курса обязательна
const Course = sequelize.define('course', 
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
        rating: {type: DataTypes.INTEGER, defaultValue: 0},
        title: {type:DataTypes.STRING, allowNull:false},
        description:{type:DataTypes.STRING, allowNull:false},
        img: {type: DataTypes.STRING, allowNull: false}
    }
)

const Progress = sequelize.define('progress',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
        status: {type: DataTypes.BOOLEAN, allowNull:false},
        dateEnd: {type: DataTypes.DATE, allowNull: true}
    }
)

const Rating = sequelize.define('rating', 
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
        rate: {type: DataTypes.INTEGER, allowNull:false}
    }
)

const Module = sequelize.define() 

// TODO: СДЕЛАТЬ МОДЕЛЬ КУРСА С АРТИКЛЯМИ, сделать роуты и контроллеры для курсов

User.hasMany(Article)
Article.belongsTo(User)

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Course)
Course.belongsTo(User)

Course.hasMany(Article)
Article.belongsTo(Course)

Course.hasMany(Rating)
Rating.belongsTo(Course)

User.hasMany(Like)
Like.belongsTo(User)


Article.hasMany(Comment)
Comment.belongsTo(Article)

Article.hasMany(Like)
Like.belongsTo(Article)


Comment.hasMany(Like)
Like.belongsTo(Comment)





module.exports = {
    User,
    Article,
    Comment,
    Like,
    Course,
    Rating
}