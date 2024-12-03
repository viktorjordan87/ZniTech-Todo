import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createSingleTask,
  deleteSingleTask,
  getAllTasks,
  updateStatusDone,
  updateTaskOrder,
} from "../queries/task";
import toast from "react-hot-toast";
import { TaskType } from "../schemas/task";

/* READ - GET TASKS */
const useTasksQuery = () => {
  return useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(),
    refetchOnWindowFocus: true, // Refetch only when the window regains focus
    refetchOnMount: false, // Avoid refetching when the component remounts
    refetchOnReconnect: true, // Optional: Refetch on internet reconnect
  });
};

/* CREATE */
const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSingleTask,
    onSuccess: (newTask) => {
      // Update the cache with the new merchant
      if (newTask !== null) {
        toast.success("Task successfully created");
        queryClient.setQueryData(
          ["tasks"],
          (old: TaskType[]) =>
            [...old, newTask].sort((a, b) => a.order - b.order) // Sort tasks by order
        );
      }
    },
  });
};

/* UPDATE */
const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatusDone,
    onSuccess: (updatedTask) => {
      // Update the cache
      if (updatedTask !== null) {
        toast.success("Task successfully updated");
        queryClient.setQueryData(
          ["tasks"],
          (old: TaskType[]) =>
            old
              .map((task) => (task.id === updatedTask.id ? updatedTask : task))
              .sort((a, b) => a.order - b.order) // Sort tasks by order
        );
      }
    },
  });
};

/* DELETE */
const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSingleTask,
    onSuccess: (deletedTask) => {
      // Update the cache
      if (deletedTask !== null) {
        toast.success("Task successfully deleted");
        queryClient.setQueryData(
          ["tasks"],
          (old: TaskType[]) =>
            old
              .filter((task) => task.id !== deletedTask.id)
              .sort((a, b) => a.order - b.order) // Sort tasks by order
        );
      }
    },
  });
};

/* UPDATE ORDER */
const useUpdateTaskOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskOrder,
    onSuccess: (updatedTask) => {
      // Update the cache
      // Invalidate the tasks query to refetch data after a successful update
      if (updatedTask !== null) {
        toast.success("Task successfully updated");

        // Invalidate the query for tasks and trigger a refetch
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
};

export {
  useTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskOrderMutation,
};
