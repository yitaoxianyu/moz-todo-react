import Todo from "./components/Todo.js"
import React from "react";
import FilterButton from "./components/FilterButton.js";
import Form from "./components/Form.js";
import { useState } from "react";
import {nanoid} from "nanoid";


function App(props) {
  const [tasks,setTasks] = useState([]);
  
  function Addtask(name){
    const newTask = {id: `todo-${nanoid()}`,completed:false,name:name};
    setTasks([...tasks,newTask]);
  }
  
  function deleteTask(id) {
    const remainingTask = tasks.filter((task)=> id != task.id);
    setTasks(remainingTask);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map((task)=>{
      if(id == task.id){
        return {...task,name : newName}
      }
      return task
    }
   )
   setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task)=> {
      if(task.id == id){
        //进行修改
        return {...task,completed:!task.completed};
      }
      return task;
    }
  )
  setTasks(updatedTasks);
  }

  const taskList = tasks.map(
    (task) => <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  )
  const tasksNoun = tasks.length >1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return(
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={Addtask}/>
      <div className="filters btn-group stack-exception">  
      <FilterButton />
      <FilterButton />
      <FilterButton />  
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
       {taskList}   
      </ul>
    </div>
  );
}


export default App;
