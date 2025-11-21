import { OrderRepository } from "./infrastructure/repository/order.repository";
import { MockBroker } from "./infrastructure/mock-broker";
import { CreateOrder } from "./application/order/create-order.usecase";
import { ExecuteOrder } from "./application/order/execute-order.usecase";
import { CancelOrder } from "./application/order/cancel-order.usecase";
import { GetFilteredOrders } from "./application/order/get-filtered-orders.usecase";
import { OrderController } from "./presentation/order/order.controller";

export class Initiator {
    // Repositories
    public orderRepository: OrderRepository;

    // Broker
    public mockBroker: MockBroker;

    // Usecases
    public createOrderUsecase!: CreateOrder;
    public executeOrderUsecase!: ExecuteOrder;
    public cancelOrderUsecase!: CancelOrder;
    public getFilteredOrdersUsecase!: GetFilteredOrders;

    // Controllers
    public orderController!: OrderController;

    private initialized = false;

    constructor() {
        // Repositories
        this.orderRepository = new OrderRepository();

        // Broker
        this.mockBroker = new MockBroker();
    }

    public setupUsecases() {
        this.createOrderUsecase = new CreateOrder(this.orderRepository, this.mockBroker);
        this.executeOrderUsecase = new ExecuteOrder(this.orderRepository, this.mockBroker);
        this.cancelOrderUsecase = new CancelOrder(this.orderRepository, this.mockBroker);
        this.getFilteredOrdersUsecase = new GetFilteredOrders(this.orderRepository);
    }

    public setupControllers() {
        this.orderController = new OrderController(
            this.createOrderUsecase,
            this.executeOrderUsecase,
            this.cancelOrderUsecase,
            this.getFilteredOrdersUsecase
        );
        this.initialized = true;
    }

    private ensureInitialized() {
        if (!this.initialized) {
            this.setupUsecases();
            this.setupControllers();
        }
    }

    public getOrderController(): OrderController {
        this.ensureInitialized();
        return this.orderController;
    }
}

// Export singleton instance
export const initiator = new Initiator();
