import z from "zod";

const CategorySchema = z.object({
  id:z.string(),
  name: z.string().min(1,{error: 'category name required'}),
  createdBy: z.string(),
  createdAt: z.coerce.date,
  updatedAt: z.coerce.date,
});

export const CreateCategory = CategorySchema.pick({
  name: true
})

export type createCategoryType = z.infer<typeof CreateCategory>;
export type categoryType = z.infer<typeof CategorySchema>;
