import {OrderModel} from "../db/model/order.model";
import {AppDataSource} from "../db/datasource";
import { IOrderRepository } from "../../domain/order/order.repository";
import {Repository} from "typeorm";
import {Order} from "../../domain/order/order.entity";
import {OrderMapper} from "../../domain/order/order.mapper";


export class OrderRepository implements IOrderRepository {

    private repo: Repository<OrderModel>;

    constructor() {
        this.repo = AppDataSource.getRepository(OrderModel);
    }

    async save(order: Order): Promise<Order> {
        const persistence = OrderMapper.toPersistence(order);

        const savedModel = await this.repo.save(
            this.repo.create(persistence)
        );

        return OrderMapper.toDomain(savedModel);
    }

    async findById(id: string): Promise<Order | null> {
        const model = await this.repo.findOne({where: {id}});
        return model ? OrderMapper.toDomain(model) : null;
    }

    async getAll(): Promise<Order[]> {
        const models = await this.repo.find();
        return models.map(OrderMapper.toDomain);
    }
}