// import {DataSource} from "typeorm";
// import {OrderModel} from "./model/order.model";
// import {UserModel} from "./model/user.model";
//
//
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: [OrderModel, UserModel],
//     synchronize: true,
//     logging: true,
// });

import { DataSource } from "typeorm";
import { OrderModel } from "./model/order.model";
import { UserModel } from "./model/user.model";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [OrderModel, UserModel],
    synchronize: true,
    logging: true,
});
