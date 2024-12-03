import { z } from "zod";

const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Task title is required" }),
  order: z.number({ message: "Task order is required" }),
  status: z.enum(["open", "done"], {
    message: "Task status must be either 'open' or 'done'",
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateSingleTaskSchema = TaskSchema.omit({
  createdAt: true,
  updatedAt: true,
});

type TaskType = z.infer<typeof TaskSchema>;
type CreateSingleTaskType = z.infer<typeof CreateSingleTaskSchema>;

export { TaskSchema, CreateSingleTaskSchema };
export type { TaskType, CreateSingleTaskType };
