import { z } from "zod";

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  status: z.enum(["open", "done"]),
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
