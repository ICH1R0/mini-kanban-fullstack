import { useEffect, useState } from 'react';


function App(){

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

    return(
      <div>
        <pre>{JSON.stringify(tasks)}</pre>
      </div>
    );
}


export default App;