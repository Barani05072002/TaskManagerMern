const mongo = require('mongoose')

const Schema = mongo.Schema;

const TaskSchema = new Schema({
    title : {
        type: String,
        require: true
    },
    description:{
        type: String
    },
    priority:{
        type:String
    },
    status:{
        type:String
    },
}, 
)

module.exports = mongo.model("Task",TaskSchema)