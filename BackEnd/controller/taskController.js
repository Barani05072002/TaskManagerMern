const mongo = require('mongoose')
const taskModel = require('../model/TaskModel')

const createTask = async (req,res) =>{
    const {title,description,priority,status} = req.body
    try{
        const task = await taskModel.create({title,description,priority,status})
        return res.status(200).json(task)

    }catch(err){
        return res.status(400).json({error: err.message })
    }  
};

const getAllTask = async (req,res)=>{
    try{
        const tasks = await taskModel.find({})
        return res.status(200).json(tasks)
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

const getSingleTask = async(req,res)=>{
        const {id} = req.params
        if(!mongo.Types.ObjectId.isValid(id))
            return res.status(400).json({message:"Task Not found"})

        try{
            const singleTask = await taskModel.findById(id)
            return res.status(200).json(singleTask)
        }catch(err){
            return res.status(400).json({error:err.message})
        }
}

const updateTask = async(req,res)=>{
    const {id} = req.params
    if(!mongo.Types.ObjectId.isValid(id))
        return res.status(400).json({message:"Task not found"})

    try{
        const task = await taskModel.findByIdAndUpdate({_id:id}
            ,{...req.body})
        return res.status(200).json({task})
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}

const deleteTask = async(req,res)=>{
    const {id} = req.params;
    if(!mongo.Types.ObjectId.isValid(id))
        return res.status(400).json({message:"Task not found"})

    try{
        const tasks = await taskModel.findByIdAndDelete(id)
        return res.status(200).json(tasks)
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}
module.exports = {createTask,getAllTask,getSingleTask,updateTask,deleteTask}