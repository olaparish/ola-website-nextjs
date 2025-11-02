// import api from "@/utils/axios";
// import { FileUploadResponse } from "../../types/inputs";

// export const configService = {
//   uploadFile: async (file: File): Promise<FileUploadResponse> => {
//     const formData = new FormData();
//     console.log("Uploading File...", typeof file);
//     formData.append("file", file);

//     const { data } = await api.post<FileUploadResponse>("/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return data;
//   },
// };

import { apiWrapper, ApiResponse } from "@/utils/api-wrapper";
import api from "@/utils/axios";

interface FileUploadResponse {
  url: string;
}

export const configService = {
  uploadFile: async (file: File): Promise<ApiResponse<FileUploadResponse>> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiWrapper(
      async () => {
        const { data } = await api.post<FileUploadResponse>(
          "/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        return data;
      },
      {
        errorMessage: "Failed to upload file.",
        fallbackData: { url: "" },
      }
    );
  },
};
