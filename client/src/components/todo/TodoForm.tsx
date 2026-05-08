import { useState } from "react";
import { useCreateTodo } from "../../hooks/todo/useCreateTodo";
import type { FormEvent } from "../../types/even";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/handleApiError";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateTodo();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    mutate(
      { title },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setTitle("");
        },
        onError: handleApiError,
      },
    );
  };

  return (
    <div className="mb-6">
      <div className="">
        <form onSubmit={handleSubmit} className="flex gap-x-2">
          <input
            type="text"
            placeholder="Add new task"
            className="input w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button className="btn btn-primary" disabled={isPending}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
