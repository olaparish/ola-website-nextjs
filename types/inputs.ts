import { ProcessedFile } from "./files";

export interface FileInputType {
  file: File;
  url: ProcessedFile;
}

export interface FileUploadResponse {
  url: string;
}


interface Paginate {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
export interface PaginationControlsType extends Paginate {
  changePage: (pageNumber: number) => void;
}
export interface PaginateResult<T> extends Paginate {
  docs: T[];
}