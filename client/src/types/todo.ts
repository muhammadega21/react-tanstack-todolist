export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  completed?: boolean;
}

export interface CreateTodoPayload {
  title: string;
}

export interface UpdateTodoPayload {
  title?: string;
  completed?: boolean;
}
