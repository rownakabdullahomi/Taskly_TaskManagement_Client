/* eslint-disable react/prop-types */
import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTaskContext } from "../../../providers/TaskProvider";
import moment from "moment";

const ItemTypes = {
  TASK: "task",
};

const TaskCard = ({ task, index }) => {
  const { moveTask, handleEditTaskClick, handleDeleteTaskClick } =
    useTaskContext();
  const ref = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id, index, status: task.status },
  })[1];

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      if (draggedItem.status === task.status) {
        moveTask(draggedItem.index, index, task.status);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="border rounded-2xl shadow-md p-4 mb-4 bg-base-100"
    >
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <p className="my-2">{task.description}</p>
      <p className={`my-2 badge badge-outline ${task.status === "inprogress"
          ? "badge-warning"
          : task.status === "todo"
          ? "badge-secondary"
          : "badge-accent"} `}>
        {task.status === "inprogress"
          ? "In Progress"
          : task.status === "todo"
          ? "Todo"
          : "Done"}
      </p>
      <p className="text-sm my-2">
        {moment(task.timeStamp).format("DD/MM/YYYY dddd hh.mm A")}
      </p>
      <div className="flex gap-3 mt-4">
        <FaEdit
          className="text-primary cursor-pointer"
          onClick={() => handleEditTaskClick(task)}
        />
        <FaTrash
          className="text-error cursor-pointer"
          onClick={() => handleDeleteTaskClick(task._id)}
        />
      </div>
    </div>
  );
};

export default TaskCard;
