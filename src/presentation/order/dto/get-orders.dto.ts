import { z } from "zod";

export const getOrdersQuerySchema = z.object({
    userId: z.string().optional(),
    status: z.enum(["PENDING", "EXECUTED", "CANCELED"]).optional(),
    page: z.coerce.number().min(1).optional().default(1),
    limit: z.coerce.number().min(1).max(100).optional().default(10),
});

export type GetOrdersQueryDto = z.infer<typeof getOrdersQuerySchema>;
