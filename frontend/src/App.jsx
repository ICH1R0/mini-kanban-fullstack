import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Column from './components/Column';
import './App.css';


function App(){

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);


  function hadlerCreateTask(){
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, status:'to-do'})
    })

      .then(response => response.json())
      .then(createdTask => {
        setTasks([...tasks, createdTask]);
        setNewTask('');
      });
  }

  function handleDeleteTask(id){
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE'
    })

      .then(() => {
        setTasks(tasks.filter(tasks => tasks.id !== id))
      });
  }

  function handleDragEnd (event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ status: newStatus })
    })
  }

    return(
      <DndContext onDragEnd={handleDragEnd}>
      <div className='board'>

        <div>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Nova Tarefa...'
          />
          <button onClick={hadlerCreateTask}>Adicionar!</button>
        </div>

        <Column title="To-do" status="to-do" tasks={tasks.filter(task => task.status === 'to-do')} onDelete={handleDeleteTask} />
        <Column title="Em progresso" status="in_progress" tasks={tasks.filter(task => task.status === 'in_progress')} onDelete={handleDeleteTask}/>
        <Column title="Concluído" status="done" tasks={tasks.filter(task => task.status === 'done')} onDelete={handleDeleteTask}/>

      </div>
      </DndContext>
    );
}


export default App;