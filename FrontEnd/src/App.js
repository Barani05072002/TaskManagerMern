import React, {useEffect, useState} from 'react'
import Nav from './component/Nav'
import Form from './component/Form'
import Table from './component/Table'
import taskContext from './component/taskContext'
import Edit from './component/Edit'

const App = () => {
  const [task,setTask] = useState([]);
  const [change,setChange] = useState(1); //reder manage
  const [edit,setEdit] = useState(false); //edit toggle
  const [data,setData] = useState(0);  //edit data

  useEffect(()=>{
    fetch("http://localhost:5555/api/tasks/",{method:"GET"})
    .then((response)=>response.json())
    .then((result) => setTask(result))
    .catch((error) =>console.error('Error occured'))
    },[change])
    
  const handleChildChange = (childChange)=>{
      const {changestate,edit,editData} = childChange
      setChange(change + changestate)
      setEdit(edit)
      setData(editData)
  }
  console.log(data)
  return (
    <div className='app flex column'>
      <taskContext.Provider value={task}>
         <Nav/>
         <main className='flex'>
          {edit
            ? <Edit data={data} onChange={handleChildChange}/>
            : <Form onChange={handleChildChange}/>
          }
            
            <Table onChange={handleChildChange}/>
         </main>
      </taskContext.Provider>
    </div>
  )
}

export default App