import { IOrderRepository } from "../../domain/order/order.repository";
import { OrderStatus } from "../../domain/order/order-status.enum";

interface GetOrdersFilters {
    userId?: string;
    status?: OrderStatus;
}

export class GetOrders {
    constructor(private readonly orderRepo: IOrderRepository) {}

    async execute(filters: GetOrdersFilters) {
        const allOrders = await this.orderRepo.getAll();
        return allOrders.filter(order => {
            if (filters.userId && order.userId !== filters.userId) return false;
            if (filters.status && order.status !== filters.status) return false;
            return true;
        });
    }
}
