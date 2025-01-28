import { z } from 'zod';

export const streamWishFileSchema = z.object({
  thumbnail: z.string(),
  link: z.string(),
  file_code: z.string(),
  canplay: z.number(),
  length: z.number(),
  views: z.number(),
  uploaded: z.string(),
  public: z.number(),
  fld_id: z.number(),
  title: z.string(),
});
export type StreamWishFile = z.infer<typeof streamWishFileSchema>;
