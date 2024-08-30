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
  const[editCount,setCount] = useState(0);

  //使用异步
  //从服务器拉取任务列表
  useEffect(() => {fetch("http://localhost:8080/todo").then(
    (res) =>{return res.json()} //解析json串也很耗时所以也需要异步
  ).then(
    (todos) =>{
      setTasks(todos)
    }
  )}
  ,[editCount]//页面刷新才显示任务
  )

  
  
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
    //请求后端进行添加
    fetch("http://localhost:8080/todo/add?name=" + name + "&isComplete=false",{method:"post"}).then(alert("添加成功r"))
    setCount(editCount + 1);
  }
  
  function deleteTask(id) {
    fetch("http://localhost:8080/todo/delete?id=" + id).then(alert("删除成功"))
    setCount(editCount + 1);
  }

  function editTask(id, newName){
    fetch("http://localhost:8080/todo/edit?id=" + id + "&newName=" + newName).then(alert("修改成功"))
    setCount(editCount + 1);
  }

  function toggleTaskCompleted(id){
   fetch("http://localhost:8080/todo/toggle?id=" + id).then(alert("修改成功")).catch((error) =>{console.log(error)})
   setCount(editCount + 1);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map(
    (task) => <Todo 
    name={task.name} 
    id={task.id} 
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
