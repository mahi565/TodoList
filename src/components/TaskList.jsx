import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete }) => (
    <ul className="list-group">
        {tasks.map((task, index) => (
            <TaskItem key={index} task={task} onDelete={onDelete} />
        ))}
    </ul>
);

export default TaskList;
