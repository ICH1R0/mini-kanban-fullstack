import { useEffect, useState } from 'react';
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
      })
  }

    return(

      <div className='board'>

        <div>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Nova Tarefa...'
          />
          <button onClick={hadlerCreateTask}>Adicionar!</button>
        </div>

        <Column title="To-do" tasks={tasks.filter(task => task.status === 'to-do')}/>
        <Column title="Em progresso" tasks={tasks.filter(task => task.status === 'in_progress')}/>
        <Column title="Concluído" tasks={tasks.filter(task => task.status === 'done')}/>

      </div>
    );
}


export default App;