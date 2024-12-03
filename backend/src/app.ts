import Fastify, { FastifyInstance } from "fastify";
import { StatusCodes } from "http-status-codes";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import "./cron/jobs";

/* Routes */
import taskRoutes from "./modules/task/task.routes";

//Hooks
import { errorHandler } from "./errors/errorHandler";
import path from "path";

const opts: {
  logger: boolean | { transport: { target: string } };
} = {
  logger: true,
};

//make logger one line if it is a TTY and beautiful if it is not
if (process.stdout.isTTY) {
  opts.logger = {
    transport: {
      target: "@fastify/one-line-logger",
    },
  };
}

const server: FastifyInstance =
  Fastify(opts).withTypeProvider<ZodTypeProvider>();

server.get("/healthcheck", async (request, response) => {
  return { status: StatusCodes.OK, message: "Server is running" };
});

const main = async () => {
  //Zod Type Provider
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Register routes
  server.register(taskRoutes, { prefix: "/api/v1/task" });

  // Register CORS
  server.register(cors, {
    origin: process.env.APP_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });

  // Serve static files if in production
  if (process.env.NODE_ENV === "production") {
    const frontendPath = path.resolve(__dirname, "../../frontend/dist");

    // Serve static files
    server.register(fastifyStatic, {
      root: frontendPath,
      allowedPath(pathName: string, root: string, req: any) {
        console.log(pathName, root);
        return !pathName.startsWith("/api");
      },
    });

    // Catch-all route to serve index.html for frontend routes
    server.setNotFoundHandler((request, reply) => {
      reply.sendFile("index.html"); // Serve the index.html file for SPA
    });
  }

  //Error Handler
  server.setErrorHandler(errorHandler);

  try {
    await server.listen({
      port: Number(process.env.PORT),
      host: "0.0.0.0",
    });
    console.log(`Server ready at http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
};

main();
