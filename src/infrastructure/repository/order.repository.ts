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

    async findFiltered(filters: { userId?: string; status?: string; page?: number; limit?: number }): Promise<{ orders: Order[], total: number }> {
        const query = this.repo.createQueryBuilder("order");

        if (filters.userId) query.andWhere("order.userId = :userId", { userId: filters.userId });
        if (filters.status) query.andWhere("order.status = :status", { status: filters.status });

        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const skip = (page - 1) * limit;

        query.skip(skip).take(limit);

        const [models, total] = await query.getManyAndCount();

        return {
            orders: models.map(OrderMapper.toDomain),
            total,
        };
    }

}