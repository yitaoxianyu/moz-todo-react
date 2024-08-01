import Todo from "./components/Todo.js"
import React, { useEffect, useRef } from "react";
import FilterButton from "./components/FilterButton.js";
import Form from "./components/Form.js";
import { useState } from "react";
import {nanoid} from "nanoid";


//对象里面包含三中check方法
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks,setTasks] = useState([]);
  const [filter,setFilter] = useState("All");

  //获取三个名字用来构成组件 
  const filterList = FILTER_NAMES.map((name)=> (
  <FilterButton 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}
  />
  )
)


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

  const taskList = tasks.filter(FILTER_MAP[filter]).map(
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

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);
  function usePrevious(length){
    const ref = useRef();
    useEffect(()=>{
      ref.current = length;
    })
    return ref.current;
  }
  useEffect(()=>{
    if(prevTaskLength > tasks.length){
      listHeadingRef.current.focus();
    }
  },[tasks.length,prevTaskLength]);

  return(
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={Addtask}/>
      <div className="filters btn-group stack-exception">  
      {filterList}
      </div>
      <h2 id="list-heading" ref={listHeadingRef} tabIndex="-1">{headingText}</h2>
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
