function TaskCard({ task }) {
    return (
        <div className = "task-card">
            <p>{task.title}</p>
        </div>
    );
}

export default TaskCard