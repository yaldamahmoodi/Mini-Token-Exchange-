import {z} from "zod";

export const cancelOrderSchema = z.object({
    id: z.uuid({ message: "Invalid order ID" })
});

export type CancelOrderDto = z.infer<typeof cancelOrderSchema>;