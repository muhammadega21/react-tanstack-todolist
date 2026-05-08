import { useCallback, useState } from "react";
import TodoForm from "../components/todo/TodoForm";
import TodoFilter from "../components/todo/TodoFilter";
import TodoList from "../components/todo/TodoList";
import TodoPagination from "../components/todo/TodoPagination";
import { useTodos } from "../hooks/todo/useTodos";

const TodoPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<boolean | undefined>();

  const { data, isLoading, error } = useTodos({
    page,
    search,
    completed,
  });

  const handleSearchChange = useCallback(() => {
    setPage(1);
  }, []);

  return (
    <div className="grid place-items-center min-h-screen py-10 bg-gray-200 text-gray-800">
      <div className="bg-white shadow-sm w-1/2 lg:w-2/5 px-6 py-3 rounded">
        <h1 className="text-center font-semibold text-xl mb-4">Todolist App</h1>

        <TodoForm />
        <TodoFilter
          search={search}
          setSearch={setSearch}
          completed={completed}
          setCompleted={(value) => {
            setCompleted(value);
            setPage(1);
          }}
          onSearchChange={handleSearchChange}
        />
        <div className="relative ">
          <TodoList
            todos={data?.data || []}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <TodoPagination
          page={page}
          totalPages={data?.meta?.totalPages || 1}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default TodoPage;
