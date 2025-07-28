import type { DocumentCreateRequest, DocumentResource } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function documentCreateFn(data: DocumentCreateRequest) {
  const formData = new FormData();
  formData.append('file', data.file);
  if (data.for) {
    formData.append('for', data.for);
  }
  const res = await http.post<ApiResponse<DocumentResource>>(
    `/documents`,
    formData,
  );
  return res.data;
}

export async function documentShowtFn(id: string | undefined) {
  if (!id)
    return null;
  const res = await http.get<ApiResponse<DocumentResource>>(`/documents/${id}`);
  return res.data;
}
