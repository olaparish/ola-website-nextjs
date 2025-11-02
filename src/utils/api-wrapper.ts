import { toast } from "sonner";
import { APIError } from "@/utils/axios";

export type ApiResponse<T = unknown> = {
  data: T | null;
  error: string | null;
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
}

export async function apiWrapper<T>(
  action: () => Promise<T>,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    showSuccess?: boolean;
    showError?: boolean;
    fallbackData?: T;
  }
): Promise<ApiResponse<T>> {
  try {
    const data = await action();
    if (
      typeof window !== "undefined" &&
      options?.showSuccess !== false &&
      options?.successMessage
    ) {
      toast.success(options.successMessage);
    }
    return { data: data ?? options?.fallbackData ?? null, error: null };
  } catch (error) {
    const errMsg =
      getErrorMessage(error) ||
      options?.errorMessage ||
      "An unexpected error occurred.";
    if (typeof window !== "undefined" && options?.showError !== false) {
      toast.error(errMsg);
    }
    return { data: options?.fallbackData ?? null, error: errMsg };
  }
}
