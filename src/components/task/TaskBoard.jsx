import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import { useState } from "react";

function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such that I can build a task management app and many more",
    tags: ["react", "web", "js"],
    priority: "High",
    isFavourite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskToUpdate?.id) {
            return newTask;
          }
          return task;
        }),
      );
    }

    setShowAddModal(false);
      setTaskToUpdate(null);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter(task => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAllClick() {

    setTasks([]);
  }

  function handlefavourite(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const newTasks = [...tasks];

    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;

    setTasks(newTasks);
  }

  return (
    <section className="mb-20" id="tasks">
      {/* Task modal*/}
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        {/* Search Box */}
        <SearchTask />
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowAddModal(true)} onDeleteAllClick={handleDeleteAllClick}/>
          <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onFav={handlefavourite} />
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
