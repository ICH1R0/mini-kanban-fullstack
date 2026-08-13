import TaskCard from './TaskCard'
import { useDroppable } from '@dnd-kit/core'


function Column({title, tasks, onDelete, status, onEdit}){
    
    const { setNodeRef } = useDroppable({ id: status })

    return(
        <div className='column' ref={setNodeRef}>
            <h2>{title}</h2>
            {tasks.map (task =>(
                <TaskCard key = {task.id} task={task} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </div>
    )
}

export default Column