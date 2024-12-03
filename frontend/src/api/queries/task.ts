import toast from "react-hot-toast";
import { CreateSingleTaskType, TaskSchema, TaskType } from "../schemas/task";
import { apiClient } from "./axios";
import { AxiosError } from "axios";

// Define the expected structure of the error response
interface ErrorResponse {
  message?: string;
}

//create single task api call
const createSingleTask = async (data: CreateSingleTaskType) => {
  return apiClient
    .post("/api/v1/task/create-single-task", data)
    .then((response) => {
      // Transform the response data to match the schema
      const transformedData = {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };

      const parsedData = TaskSchema.safeParse(transformedData);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        toast.error("Error during task validation");
        return null;
      }
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      toast.error(
        error?.response?.data?.message || "Error during task creation"
      );
      console.log(error);
      return null;
    });
};

//get all tasks
const getAllTasks = async () => {
  return apiClient
    .get("/api/v1/task/get-all-tasks")
    .then((response) => {
      // Transform the response data to match the schema
      const transformedData = response.data.map((automata: TaskType) => ({
        ...automata,
        createdAt: new Date(automata.createdAt),
        updatedAt: new Date(automata.updatedAt),
      }));

      const parsedData = TaskSchema.array().safeParse(transformedData);

      if (parsedData.success) {
        //order the tasks by order
        const sortedData = parsedData.data.sort((a, b) => a.order - b.order);

        return sortedData;
      } else {
        toast.error("Error during task validation");
        return [];
      }
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      toast.error(
        error?.response?.data?.message || "Error during task fetching"
      );
      console.log(error);
      return null;
    });
};

//update status to done
const updateStatusDone = async (id: string) => {
  return apiClient
    .patch(`/api/v1/task/update-status-done/${id}`)
    .then((response) => {
      // Transform the response data to match the schema
      const transformedData = {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };

      const parsedData = TaskSchema.safeParse(transformedData);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        toast.error("Error during task validation");
        return null;
      }
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Error during task update");
      console.log(error);
      return null;
    });
};

//delete single task by id
const deleteSingleTask = async (id: string) => {
  return apiClient
    .delete(`/api/v1/task/delete-single-task/${id}`)
    .then((response) => {
      // Transform the response data to match the schema
      const transformedData = {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };

      const parsedData = TaskSchema.safeParse(transformedData);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        toast.error("Error during task validation");
        return null;
      }
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Error during task delete");
      console.log(error);
      return null;
    });
};

//update task order
const updateTaskOrder = async (data: { id: string; order: number }[]) => {
  return apiClient
    .patch("/api/v1/task/update-task-order", data)
    .then((response) => {
      // Transform the response data to match the schema
      const transformedData = {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };

      const parsedData = TaskSchema.safeParse(transformedData);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        toast.error("Error during task validation");
        return null;
      }
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || "Error during task update");
      console.log(error);
      return null;
    });
};

export {
  createSingleTask,
  getAllTasks,
  updateStatusDone,
  deleteSingleTask,
  updateTaskOrder,
};
