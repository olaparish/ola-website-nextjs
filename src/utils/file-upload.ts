import { configService } from "@/services/config.service";
import { processFile } from "./fileUtils";
import { toast } from "sonner";

/**
 * Processes and uploads a file, returning the uploaded URL.
 * Handles HEIC conversion via processFile and standardizes error handling.
 *
 * @param file The file to upload
 * @returns Promise resolving to the uploaded file URL
 * @throws Error if upload fails
 */
export async function uploadFile(file: File): Promise<string> {
  try {
    // 1. Process the file (HEIC conversion, etc.)
    const { file: processedFile } = await processFile(file);

    // 2. Upload via configService
    // configService.uploadFile returns ApiResponse<FileUploadResponse>
    // checking the definition in config.service.ts:
    // export const configService = {
    //   uploadFile: async (file: File): Promise<ApiResponse<FileUploadResponse>> => { ... }
    // }
    // ApiResponse has { data: T | null; error: string | null }
    // FileUploadResponse has { url: string }

    const response = await configService.uploadFile(processedFile);

    if (response.error || !response.data?.url) {
      const errorMessage =
        response.error || "Failed to upload file. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    return response.data.url;
  } catch (error) {
    console.error("File upload error:", error);
    if (error instanceof Error) {
      // toast is likely already shown if it came from response.error check
      // but if it's a network error caught here, we might want to ensure toast is shown
      // However, let's let the caller handle UI feedback if they want more specificity,
      // though the requirements suggested this helper handles the heavy lifting.
      // The user snippet had toasts inside the mutation.
      // I'll leave the toast in the success logic above.
      throw error;
    }
    throw new Error("An unexpected error occurred during file upload");
  }
}
