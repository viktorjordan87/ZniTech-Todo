import { FastifyInstance } from "fastify";
import { CreateSingleTaskSchema, TaskSchema } from "./task.schemas";
import {
  createSingleTask,
  getAllTasks,
  updateStatusDone,
  deleteSingleTask,
  updateTaskOrder,
} from "./task.controllers";
import z from "zod";

const taskRoutes = async (server: FastifyInstance) => {
  server.route({
    method: "POST",
    url: "/create-single-task",
    schema: {
      body: CreateSingleTaskSchema,
      response: {
        201: TaskSchema,
      },
    },
    handler: createSingleTask,
  });

  server.route({
    method: "GET",
    url: "/get-all-tasks",
    schema: {
      response: {
        200: TaskSchema.array(),
      },
    },
    handler: getAllTasks,
  });

  server.route({
    method: "PATCH",
    url: "/update-status-done/:id",
    schema: {
      params: z.object({
        id: z.string(), // Define the params schema as an object
      }),
      response: {
        200: TaskSchema,
      },
    },
    handler: updateStatusDone,
  });

  //delete task by id
  server.route({
    method: "DELETE",
    url: "/delete-single-task/:id",
    schema: {
      params: z.object({
        id: z.string(), // Define the params schema as an object
      }),
      response: {
        200: TaskSchema,
      },
    },
    handler: deleteSingleTask,
  });

  //update task order
  server.route({
    method: "PATCH",
    url: "/update-task-order",
    schema: {
      body: z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        })
      ),
      response: {
        200: TaskSchema.array(),
      },
    },
    handler: updateTaskOrder,
  });
};

export default taskRoutes;
