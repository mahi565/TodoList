import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (task.trim()) {
            onAdd(task);
            setTask("");
        }
    };

    return (
        <div className="input-group my-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleAdd}>
                Add Task
            </button>
        </div>
    );
};

export default AddTask;
