import { ProcessedFile } from "./files";

export interface FileInputType {
  file: File;
  url: ProcessedFile;
}

export interface FileUploadResponse {
  url: string;
}


export interface PaginationControlsType {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  changePage: (pageNumber: number) => void;
}