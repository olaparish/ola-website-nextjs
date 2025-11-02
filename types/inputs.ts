import { ProcessedFile } from "./files";

export interface FileInputType {
  file: File;
  url: ProcessedFile;
}

export interface FileUploadResponse {
  url: string;
}