import {IOrderRepository} from "../../domain/order/order.repository";
import {Order} from "../../domain/order/order.entity";
import {GetOrdersQueryDto} from "../../presentation/order/dto/get-orders.dto";

export class GetFilteredOrders {
    constructor(private readonly orderRepo: IOrderRepository) {
    }

    async execute(filters: GetOrdersQueryDto): Promise<{ orders: Order[], total: number }> {
        return this.orderRepo.findFiltered(filters);
    }

}
