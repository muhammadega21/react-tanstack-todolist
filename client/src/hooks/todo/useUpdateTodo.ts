import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTodo } from "../../services/todoService";

import type { UpdateTodoPayload } from "../../types/todo";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTodoPayload }) =>
      updateTodo(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
