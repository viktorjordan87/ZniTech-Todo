import { useTasksQuery, useUpdateTaskOrderMutation } from "@/api/hooks/task";
import { CreatForm } from "@/pages/Todo/CreateForm";
import { TodoItem } from "@/pages/Todo/TodoItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"; // Importing drag and drop
import { useEffect, useState } from "react";

export const Tasks = () => {
  const { data: tasks, isPending } = useTasksQuery();
  const [localTasks, setLocalTasks] = useState(tasks || []);

  const updateTaskOrder = useUpdateTaskOrderMutation(); // Import the mutation

  useEffect(() => {
    setLocalTasks(tasks || []);
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    // If no destination (task is not dropped), do nothing
    if (!destination) return;

    // If the task is dropped at the same place, do nothing
    if (destination.index === source.index) return;

    // Reorder tasks after dragging
    const reorderedTasks = Array.from(localTasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    // Update the order of tasks
    reorderedTasks.forEach((task, index) => {
      task.order = index + 1;
    });

    // Update state with new task order
    setLocalTasks(reorderedTasks);

    //prepare the id and order of the tasks to be updated
    const updates = reorderedTasks.map((task) => ({
      id: task.id,
      order: task.order,
    }));

    // make an API call to update the task order on the server
    await updateTaskOrder.mutateAsync(updates);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto w-11/12 sm:w-3/5 md:w-2/5">
      <div className="todos-container p-10 sm:border border-gray-300 rounded-md w-full">
        <CreatForm length={localTasks.length} />

        {isPending && <p>Loading...</p>}

        {localTasks.length === 0 ? (
          <p className="text-left text-gray-500 my-4">No tasks</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-tasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  {localTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-item"
                        >
                          <TodoItem task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};
