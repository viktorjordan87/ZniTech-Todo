import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import prisma from "./../../prisma/prismaClient";
import { CreateSingleTaskType } from "./task.schemas";

//create single task
const createSingleTask = async (
  request: FastifyRequest<{ Body: CreateSingleTaskType }>,
  reply: FastifyReply
) => {
  const body = request.body;

  const newTask = await prisma.task.create({
    data: body,
  });

  return reply.status(StatusCodes.CREATED).send(newTask);
};

//get all tasks
const getAllTasks = async (request: FastifyRequest, reply: FastifyReply) => {
  const tasks = await prisma.task.findMany();

  return reply.status(StatusCodes.OK).send(tasks);
};

//update status to done
const updateStatusDone = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  const updateTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      status: "done",
    },
  });

  return reply.status(StatusCodes.OK).send(updateTask);
};

//delete single task by id
const deleteSingleTask = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  });

  return reply.status(StatusCodes.OK).send(deletedTask);
};

//update task order
const updateTaskOrder = async (
  request: FastifyRequest<{ Body: { id: string; order: number }[] }>,
  reply: FastifyReply
) => {
  const tasksToUpdate = request.body;

  const updatePromises = tasksToUpdate.map(({ id, order }) =>
    prisma.task.update({
      where: { id },
      data: { order },
    })
  );

  const updatedTasks = await Promise.all(updatePromises);

  return reply.status(StatusCodes.OK).send(updatedTasks);
};

export {
  createSingleTask,
  getAllTasks,
  updateStatusDone,
  deleteSingleTask,
  updateTaskOrder,
};
