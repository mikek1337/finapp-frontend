import z from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  name: z.string({error: 'Transaction name require'}).min(1, {error: 'Transaction name require'}),
  transactionType: z.string(),
  categoryId: z.string({error: 'Need to select category'}).min(1, {error: 'Category required'}),
  userId: z.string(),
  amount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const TransactionTypeSummary = z.object({
  transactionType: z.enum(['INCOME', 'EXPENSE']),
  total: z.number(),
  rateOfChange: z.number()
});

export type SpendingSummary = {
  total:number,
  name:string,
}

export type TransactionTypeSummaryType = z.infer<typeof TransactionTypeSummary>

export const CreateTransactionSchema = TransactionSchema.pick({
  name: true,
  transactionType: true,
  categoryId: true,
  amount: true,
});

export type createTransactionType = z.infer<typeof CreateTransactionSchema>

export type transactionType = z.infer<typeof TransactionSchema>

