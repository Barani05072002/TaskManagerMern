const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const connectDatabase = require('./config/connectDatabase')
const taskRoute = require('./routes/taskRoute')

connectDatabase()
const server = express()
dotenv.config({path:path.join(__dirname,'config','.env')})

server.use(cors());
server.use(express.json());
server.use('/api/tasks',taskRoute);


server.listen(process.env.PORT,()=>{
    console.log("Server is starded to listen "+process.env.PORT)
})