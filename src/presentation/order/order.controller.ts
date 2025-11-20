import {Request, Response} from "express";
import {CreateOrder} from "../../application/order/create-order.usecase";
import {createOrderSchema} from "./dto/create-order.dto";

export class OrderController {
    constructor(private readonly orderUseCase: CreateOrder) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response) {
        const dto = createOrderSchema.parse(req.body);
        const result = await this.orderUseCase.execute(dto);
        return res.status(201).json(result);
    }
}
