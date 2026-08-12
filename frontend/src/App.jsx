import { useEffect, useState } from 'react';
import Column from './components/Column';
import './App.css';


function App(){

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

    return(
      <div className='board'>
        <Column title="To-do" tasks={tasks.filter(task => task.status === 'to-do')}/>
        <Column title="Em progresso" tasks={tasks.filter(task => task.status === 'in_progress')}/>
        <Column title="Concluído" tasks={tasks.filter(task => task.status === 'done')}/>
      </div>
    );
}


export default App;