import TodoItem from "./TodoItem";
import type { Todo } from "../../types/todo";

interface Props {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
}

const TodoList = ({ todos, isLoading, error }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">Something went wrong</div>;
  }

  if (!todos.length) {
    return (
      <div className="text-center py-10 text-gray-400">No todos found</div>
    );
  }

  return (
    <div className="mb-3">
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
