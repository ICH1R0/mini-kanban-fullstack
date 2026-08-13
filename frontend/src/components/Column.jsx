import TaskCard from './TaskCard'


function Column({title, tasks, onDelete}){
    return(
        <div className='column'>
            <h2>{title}</h2>
            {tasks.map (task =>(
                <TaskCard key = {task.id} task={task} onDelete={onDelete}/>
            ))}
        </div>
    )
}

export default Column