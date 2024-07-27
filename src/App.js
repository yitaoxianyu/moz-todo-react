import Todo from "./components/Todo.js"
import React from "react";
import FilterButton from "./components/FilterButton.js";
import Form from "./components/Form.js";
import { useState } from "react";

function App(props) {
  const taskList = props.tasks.map((task) => <Todo id={task.id} name={task.name} completed={task.completed} key={task.id}/>)
  function Addtask(name){
    alert(name);
  }
  
  return(
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={Addtask}/>
      <div className="filters btn-group stack-exception">  
      <FilterButton />
      <FilterButton />
      <FilterButton />  
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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
