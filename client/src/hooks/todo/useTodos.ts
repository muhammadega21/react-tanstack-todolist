import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../services/todoService";
import type { TodoQueryParams } from "../../types/todo";

export const useTodos = (params: TodoQueryParams = {}) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => getTodos(params),
  });
};
