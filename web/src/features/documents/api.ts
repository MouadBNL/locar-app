import { http, type ApiResponse } from "@/lib/http";
import type { DocumentResource, DocumentCreateRequest } from "./types";

export const documentCreateFn = async (data: DocumentCreateRequest) => {
  const formData = new FormData();
  formData.append("file", data.file);
  if (data.for) {
    formData.append("for", data.for);
  }
  const res = await http.post<ApiResponse<DocumentResource>>(
    `/documents`,
    formData
  );
  return res.data;
};

export const documentShowtFn = async (id: string | undefined) => {
  if (!id) return null;
  const res = await http.get<ApiResponse<DocumentResource>>(`/documents/${id}`);
  return res.data;
};
