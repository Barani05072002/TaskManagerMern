import React, { useContext} from 'react'
import taskContext from './taskContext'

const Table = ({onChange}) => {
    const tasks =  useContext(taskContext);

    const deleteTask = (e) =>{
        const url = `http://localhost:5555/api/tasks/${e.target.value}`
        const response =fetch(url,{method : 'DELETE'})
        response.then((res)=>console.log(res))
        onChange({
            changestate : 1,
            edit : false,
            editData : 0
        });
    }
    const EditTask = (e) =>{
        // const edit = 
        onChange({
            changestate :1,
            edit : true,
            editData : e.target.value
        })
        // console.log(edit)
    }

  return (<>
        <table>
        <thead>
            <tr>
                <th>Task Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Controls</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task)=>{return <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td className='choice'>
                    <button value={task._id} onClick={EditTask} onChange={EditTask}>Edit</button>
                    <button value={task._id} onClick={deleteTask}>Delete</button>
                </td>
            </tr>})}
        </tbody>
    </table>
</>
)
}

export default Table