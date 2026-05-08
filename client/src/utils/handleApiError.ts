import axios from "axios";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "../types/api";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse;

    if (data?.errors) {
      Object.values(data.errors).forEach((message) => {
        toast.error(message);
      });

      return;
    }

    toast.error(data?.message || "Something went wrong");

    return;
  }

  toast.error("Unexpected error");
};
