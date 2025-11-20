import {Repository} from "typeorm";
import {AppDataSource} from "../db/datasource";
import {OrderModel} from "../db/model/order.model";
import {Order} from "../../domain/order/order.entity";
import {IOrderRepository} from "../../domain/order/order.repository";
import {OrderMapper} from "../../domain/order/order.mapper";

export class OrderRepository implements IOrderRepository {
    private repo: Repository<OrderModel>;

    constructor() {
        this.repo = AppDataSource.getRepository(OrderModel);
    }

    async save(order: Order): Promise<Order> {
        const model = this.repo.create(OrderMapper.toPersistence(order));
        const savedModel = await this.repo.save(model);

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