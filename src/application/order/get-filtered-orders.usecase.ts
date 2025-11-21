import { IOrderRepository } from "../../domain/order/order.repository";
import { Order } from "../../domain/order/order.entity";

export class GetFilteredOrders {
    constructor(private readonly orderRepo: IOrderRepository) {}

    async execute(filters: { userId?: string; status?: string }): Promise<Order[]> {
        return this.orderRepo.findFiltered(filters);
    }
}
