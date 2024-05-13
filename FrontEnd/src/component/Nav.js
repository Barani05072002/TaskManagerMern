import React, { useContext,memo } from 'react'
import taskContext from './taskContext';

const Nav =() => {
  const task = useContext(taskContext);
  const count = task.filter((val)=>{return val['status'] != 'Completed'})
  return (
    <nav className='flex column'>
        <h1>TASK MANAGER</h1>
        <p>you have only {count.length} task(s) left</p>
    </nav>
  )
}

export default memo(Nav);
// export default Nav;