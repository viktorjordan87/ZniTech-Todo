import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/api/hooks/task";
import { TaskType } from "@/api/schemas/task";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";

export const TodoItem = ({ task }: { task: TaskType }) => {
  const updateTaskStatus = useUpdateTaskMutation();
  const deleteTask = useDeleteTaskMutation();

  // Handler for checkbox change
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation(); // Prevents drag events from interfering
    if (task.status === "done") return;
    await updateTaskStatus.mutateAsync(task.id);
  };

  // Handler for delete button
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents drag events from interfering
    await deleteTask.mutateAsync(task.id);
  };

  return (
    <div className="flex items-center space-x-2 my-4">
      <input
        type="checkbox"
        checked={task.status === "done"}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-400 rounded-md opacity-70"
      />
      <span
        className={`cursor-move flex-grow text-customGray font-medium ${task.status === "done" && "line-through"}`}
      >
        {task.title}
      </span>
      <button
        className="text-red-500 hover:text-red-700"
        type="button"
        onClick={handleDeleteClick}
      >
        <TrashIcon />
      </button>
    </div>
  );
};
