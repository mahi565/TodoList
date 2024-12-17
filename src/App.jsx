import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const particleContainer = document.querySelector(".gradient-custom");

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.width = `${Math.random() * 10 + 10}px`;
      particle.style.height = particle.style.width;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
      particleContainer.appendChild(particle);
    }
  }, []);

  useEffect(() => {
    const moveTrail = (e) => {
      const trail = document.createElement("div");
      trail.classList.add("trail");
      trail.style.top = `${e.clientY}px`;
      trail.style.left = `${e.clientX}px`;
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 500);
    };

    window.addEventListener("mousemove", moveTrail);

    return () => {
      window.removeEventListener("mousemove", moveTrail);
    };
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const input = document.getElementById("form2");
    if (input.value.trim()) {
      setTasks([...tasks, { text: input.value, completed: false }]);
      input.value = "";
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks =
    activeTab === "active"
      ? tasks.filter((task) => !task.completed)
      : activeTab === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks;

  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <h1 className="text-center mb-4">TO DO APP</h1>
                <form
                  className="d-flex justify-content-center align-items-center mb-4"
                  onSubmit={addTask}
                >
                  <input
                    type="text"
                    id="form2"
                    className="form-control"
                    placeholder="New task..."
                  />
                  <button type="submit" className="btn btn-info ms-2">
                    Add
                  </button>
                </form>

                {/* Tabs */}
                <ul className="nav nav-tabs mb-4 pb-2">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "all" && "active"}`}
                      onClick={() => setActiveTab("all")}
                    >
                      All
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "active" && "active"
                      }`}
                      onClick={() => setActiveTab("active")}
                    >
                      Active
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "completed" && "active"
                      }`}
                      onClick={() => setActiveTab("completed")}
                    >
                      Completed
                    </button>
                  </li>
                </ul>

                {/* Task List */}
                <ul className="list-group mb-0">
                  {filteredTasks.map((task, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={task.completed}
                          onChange={() => toggleTask(index)}
                        />
                        {task.completed ? <s>{task.text}</s> : task.text}
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
