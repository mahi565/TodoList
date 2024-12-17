const TaskItem = ({ task, onDelete }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        {task}
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(task)}>
            Delete
        </button>
    </li>
);

export default TaskItem;
