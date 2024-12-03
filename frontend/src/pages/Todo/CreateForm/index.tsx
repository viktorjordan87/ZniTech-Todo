import rocket from "@/assets/images/rocket.png";
import { toFormikValidate } from "zod-formik-adapter";
import { useFormik } from "formik";
import {
  CreateSingleTaskSchema,
  CreateSingleTaskType,
} from "@/api/schemas/task";
import { useCreateTaskMutation } from "@/api/hooks/task";
import { v4 as uuidv4 } from "uuid";

export const CreatForm = ({ length }: { length: number }) => {
  const createTask = useCreateTaskMutation();

  const formik = useFormik<CreateSingleTaskType>({
    enableReinitialize: true,
    initialValues: {
      id: "", //will be overwritten by onSubmit
      title: "",
      order: length + 1,
      status: "open",
    },
    validate: toFormikValidate(CreateSingleTaskSchema),
    onSubmit: async (data) => {
      // Generate a new UUID for the task
      data.id = uuidv4();

      await createTask.mutateAsync(data);
    },
  });

  return (
    <div className="create-task">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row justify-between w-full mb-2">
          <h1 className="text-4xl font-extrabold">Tasks</h1>
          <button
            type="submit"
            className="p-2 h-12 w-12 rounded flex items-center justify-center bg-customBlue"
          >
            <img src={rocket} alt="rocket" className="w-8 max-w-full" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="new-task" className="font-bold text-customGray">
            New task:
          </label>
          <input
            type="text"
            id="new-task"
            name="title"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}
        </div>
      </form>
    </div>
  );
};
