import { OrderStatus } from "./order-status.enum";
import {OrderDomainError} from "./order-domain-error";

export class Order {
    constructor(
        public readonly id: string | null,
        public userId: string,
        public originToken: string,
        public destinationToken: string,
        public amount: number,
        public status: OrderStatus = OrderStatus.PENDING
    ) {
        this.validate();
    }

    private validate() {
        if (!this.userId) {
            throw new OrderDomainError("Order must have a userId.");
        }

        if (!this.originToken) {
            throw new OrderDomainError("Order must specify an origin token.");
        }

        if (!this.destinationToken) {
            throw new OrderDomainError("Order must specify a destination token.");
        }

        if (this.amount <= 0) {
            throw new OrderDomainError("Order amount must be greater than 0.");
        }
    }

    execute() {
        if (this.status !== OrderStatus.PENDING) {
            throw new OrderDomainError(
                "Order cannot be executed unless it is in PENDING status."
            );
        }

        this.status = OrderStatus.EXECUTED;
    }

    cancel() {
        if (this.status !== OrderStatus.PENDING) {
            throw new OrderDomainError(
                "Order cannot be canceled unless it is in PENDING status."
            );
        }

        this.status = OrderStatus.CANCELED;
    }
}
