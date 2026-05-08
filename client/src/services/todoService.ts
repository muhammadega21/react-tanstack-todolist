import { api } from "../api/axios";
import { buildQueryParams } from "../utils/queryParams";

import type {
  CreateTodoPayload,
  Todo,
  TodoQueryParams,
  UpdateTodoPayload,
} from "../types/todo";
import type { ApiResponse } from "../types/api";

export const getTodos = async (params: TodoQueryParams = {}) => {
  const query = buildQueryParams(params);

  const { data } = await api.get<ApiResponse<Todo[]>>(`/todos?${query}`);
  return data;
};

// export const getTodo = async (id: number) => {
//   const { data } = await api.get<ApiResponse<Todo>>(`/todos?${id}`);
//   return data;
// };

export const createTodo = async (payload: CreateTodoPayload) => {
  const { data } = await api.post<ApiResponse<Todo[]>>("/todos", payload);

  return data;
};

export const updateTodo = async (id: number, payload: UpdateTodoPayload) => {
  const { data } = await api.patch<ApiResponse<Todo[]>>(
    `/todos/${id}`,
    payload,
  );

  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete<ApiResponse<Todo[]>>(`/todos/${id}`);

  return data;
};
