import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react'; 

function TaskCard({ task, onDelete, onEdit }) {

    const { attributes, listeners, transform, setNodeRef} = useDraggable ({ id: task.id });
    const style = {transform: CSS.Translate.toString(transform)}
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    function handleSave() {
	    onEdit(task.id, editedTitle);
	    setIsEditing(false);
    }
    
    return (
	<div
		className="task-card"
		ref={setNodeRef}
		style={style}
	>
		<div className="drag-handle" {...listeners} {...attributes}>
			⠿
		</div>

		{isEditing ? (
			<input
				value={editedTitle}
				onChange={(e) => setEditedTitle(e.target.value)}
			/>
		) : (
			<p onClick={() => setIsEditing(true)}>{task.title}</p>
		)}
        <div className="task-actions">
			{isEditing && (
				<button onClick={handleSave}>Salvar</button>
			)}

			<button onClick={() => onDelete(task.id)}>Excluir</button>
        </div>
	</div>
);
}

export default TaskCard