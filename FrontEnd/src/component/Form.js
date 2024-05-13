import React, { useState } from 'react'

const Form = ({onChange}) => {
    const [data,setData] = useState({priority:"Normal",status:"OnProcess",title:"",description:""})
    const [warn1,setWarn1] = useState({ display :'none'})
    const [warn2,setWarn2] = useState({ display:'none'})
    const handleChange = (e)=>{
        const name = e.target.name
        const setInput = (pre)=>{ return {...pre,[name] : e.target.value}}
        setData(setInput(data))
        setWarn1({display:"block"})
    }

    const titleCheck = ()=>{
        if(data['title']==" "){
            setWarn1({display:'block',content : 'field cannot be empty'})
            return false
        }

        if(data['description']==" "){
            setWarn2({display: 'block',content : 'field cannot be empty'})
            return false
        }
        const flag =  /^[a-zA-Z()]+$/.test(data["title"])
        if(flag){
            setWarn1({display : 'none'})
            return true
        }
        console.log("from title check")
        setWarn1({display : 'block' , content : 'Enter only alphabet characters'})
        return false
    }

    const clearForm = ()=>{
        setData({priority:"Normal",title:"",description:"",status:"OnProcess"})
    }
    const handleForm = async (e)=>{
        e.preventDefault()

        if(titleCheck()){
            const url = "http://localhost:5555/api/tasks"
            const response =await fetch(url,{
            method : "POST",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data)
        })
        }
        onChange({
            changestate :1,
            edit : false,
            editData : 0
        });
        setData({priority:"Normal",title:"",description:"",status:"OnProcess"})
    }
    
  return (
    <form method='POST' onSubmit={handleForm} className='flex column'>
            <h1 className='head'>Add Task</h1>
            <div>
                <label htmlFor='title'>Task Title</label>
                <input type="text" 
                id='title'
                name='title'
                placeholder='Task Title'
                onChange={handleChange}
                value = {data.title}
                required
                />
                <p className='warn' style={warn1}>{warn1['content']}</p>
            </div>
            <div>
                <label htmlFor='Description'>Description</label>
                <input type="text" 
                name='description'
                id='description'
                placeholder='Description'
                onChange={handleChange}
                value = {data.description}
                required
                />
                <p className='warn' style={warn2}>{warn2['content']}</p>
            </div>
            <label htmlFor='priority' className="priority">Priority
                <select name="priority" id="priority" onChange={handleChange} value={data.priority}>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <label htmlFor="status" className='priority'>Status
                <select name="status" id="status" onChange={handleChange} value={data.status}>
                    <option value="Completed">Completed</option>
                    <option value="OnProcess">On-Process</option>
                    <option value="Pending">Pending</option>
                </select>
            </label>
            <div className="control">
                <button onClick={clearForm}>Clear</button>
                <button type="submit">Add Task</button>
            </div>
    </form>
  )
}

export default Form