require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const app = express()
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path')

console.log(PORT)


app.use(cors())
app.use(express.json())
app.use('/avatars', express.static(path.join(__dirname, 'avatars')))
app.use('/api', router)

app.use(errorHandler)

const models = require('./models/models')


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()