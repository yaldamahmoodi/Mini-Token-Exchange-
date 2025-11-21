import {Order} from "./order.entity";

export interface IOrderRepository {
    save(order: Order): Promise<Order>;

    findById(id: string): Promise<Order | null>;

    findFiltered(filters: { userId?: string; status?: string }): Promise<Order[]>;
}
