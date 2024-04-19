const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define( 'user',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        email:{type:DataTypes.STRING, unique:true},
        password:{type:DataTypes.STRING},
        role:{type:DataTypes.STRING, defaultValue:'USER'}
    }
)

const Article = sequelize.define( 'article',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        title:{type:DataTypes.STRING, allowNull:false},
        description:{type:DataTypes.STRING, allowNull:false},
        svg_interactivity: {type:DataTypes.STRING, allowNull:false}
    }
)

const Comment = sequelize.define( 'comment',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        author:{type:DataTypes.INTEGER, allowNull:false},
        description:{type:DataTypes.STRING, allowNull:false},
    }
)

User.hasMany(Article)
Article.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)


Article.hasMany(Comment)
Comment.belongsTo(Article)


module.exports = {
    User,
    Article,
    Comment,
}