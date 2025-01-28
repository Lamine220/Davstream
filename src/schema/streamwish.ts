import { z } from 'zod';

const wishFileSchema = z.object({
  title: z.string(),
  canplay: z.number(),
  thumbnail: z.string(),
  link: z.string(),
  fld_id: z.number(),
  views: z.number(),
  public: z.number(),
  uploaded: z.string(),
  length: z.number(),
  file_code: z.string(),
});

const wishFilesResponseSchema = z.object({
  status: z.number(),
  result: z.object({
    files: z.array(wishFileSchema),
    results_total: z.number(),
    pages: z.number(),
    results: z.number(),
  }),
  server_time: z.string(),
  msg: z.string(),
});

const importFilesSchema = z.object({
  code: z.string().min(1),
  filename: z.string().min(1),
});

export type WishFile = z.infer<typeof wishFileSchema>;
export type WishFilesResponse = z.infer<typeof wishFilesResponseSchema>;
export type ImportFiles = z.infer<typeof importFilesSchema>;

export { importFilesSchema, wishFileSchema, wishFilesResponseSchema };
