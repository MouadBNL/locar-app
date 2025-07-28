import { z } from 'zod';

const allowedMimeTypes = [
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // Spreadsheets
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // Presentations
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // Text
  'text/plain',
  'text/csv',
  // Common archives
  'application/zip',
  'application/x-rar-compressed',
];

export const zfile = z
  .any()
  .refine(v => v instanceof File, {
    message: 'File is required',
  })
  .refine(v => v.size > 0, {
    message: 'File is required',
  })
  .refine(
    (v) => {
      return allowedMimeTypes.includes(v.type);
    },
    {
      message: 'Invalide file type',
    },
  );

export const documentCreateSchema = z.object({
  file: zfile,
  for: z.string().optional(),
});
