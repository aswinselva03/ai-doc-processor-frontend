export * from "./file";
export type FileStatus = "reviewed" | "yet to review";

export interface File {
  id: number;
  name: string;
  status: FileStatus;
}

export interface FileListProps {
    files: File[];
    search: string;
    filter: "all" | "reviewed" | "yet to review";
  }