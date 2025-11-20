import {Order} from "./order.entity";

export interface IOrderRepository {
    save(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    getAll(): Promise<Order[]>;
}
