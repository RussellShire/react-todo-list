import React, { useState } from "react";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

function AppFunction() {
    const [newTask, setNewTask] = useState({})
    const [allTasks, setAllTasks] = useState([])

    const handleChange = ({ target }) => {
        const { name, value } = target;
        
        setNewTask((prev) => ({ 
          ...prev,
          [name]: value,
          id: Date.now()
        }));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!newTask.title) {
            return
            }

        setAllTasks((prev) => {
            return [newTask, ...prev]
        })
        setNewTask({ 
            title: '',
            id: ''
        });
    }

    const handleDelete = (taskId) => {
        const allTasksClone = structuredClone(allTasks)
        setAllTasks(allTasksClone.filter((task) => task.id !== taskId) // I think this is mutating state directly, need to check
        )
    }

    return (
        <main>
            <h1>Tasks</h1>
            <NewTask
                newTask={newTask}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <TasksList
                allTasks={allTasks}
                handleDelete={handleDelete}
            />
        </main>
    )
}

export default AppFunction;
