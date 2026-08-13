import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'; 

function TaskCard({ task, onDelete }) {

    const { attributes, listeners, transform, setNodeRef} = useDraggable ({ id: task.id });
    const style = {transform: CSS.Translate.toString(transform)}
    
    return (
        <div 
            className = "task-card"    
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <p>{task.title}</p>
            <button onClick={() => onDelete(task.id)}>Excluir</button>
        </div>
    );
}

export default TaskCard