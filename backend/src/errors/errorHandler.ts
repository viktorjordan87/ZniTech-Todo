import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  error: any,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  // Prisma-specific error handling
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Check if the error is a unique constraint violation

    return reply.status(StatusCodes.BAD_REQUEST).send({
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  }
  console.log(error);
  const statusCode = error.statusCode;
  reply.send({
    status: statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
  });
};
