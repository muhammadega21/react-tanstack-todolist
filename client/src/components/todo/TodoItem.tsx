import { Check, CheckCircle2, Circle, Pencil, Trash, X } from "lucide-react";
import type { Todo } from "../../types/todo";
import { useDeleteTodo } from "../../hooks/todo/useDeleteTodo";
import { useUpdateTodo } from "../../hooks/todo/useUpdateTodo";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/handleApiError";
import { useState } from "react";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();

  const handleToggleCompleted = () => {
    updateTodo(
      {
        id: todo.id,
        payload: {
          completed: !todo.completed,
        },
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);
        },
        onError: handleApiError,
      },
    );
  };

  const handleUpdateTodo = () => {
    updateTodo(
      {
        id: todo.id,
        payload: {
          title,
        },
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setIsEditing(false);
        },
        onError: handleApiError,
      },
    );
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: handleApiError,
    });
  };

  return (
    <div className="flex items-center gap-x-3 border-b border-gray-300 pb-1 mb-3">
      <div className="my-auto ">
        <button
          type="button"
          className="block cursor-pointer"
          onClick={handleToggleCompleted}
          disabled={isUpdating}
        >
          {todo.completed ? (
            <CheckCircle2 className="text-green-500" size={20} />
          ) : (
            <Circle size={20} />
          )}
        </button>
      </div>
      <div className="w-full">
        <input
          type="text"
          className={`w-full input border-0 outline-0 shadow-none bg-transparent ${todo.completed ? "line-through text-gray-600" : ""}`}
          value={title}
          readOnly={!isEditing}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex gap-x-1">
        {isEditing ? (
          <>
            <button
              type="button"
              className="btn btn-sm btn-success"
              disabled={isUpdating}
              onClick={handleUpdateTodo}
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                setTitle(todo.title);
                setIsEditing(false);
              }}
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-warning"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-error"
          disabled={isDeleting}
          onClick={handleDeleteTodo}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
