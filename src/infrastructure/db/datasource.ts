import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

const isCompiled = __dirname.includes("dist");
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: ['error'],
    entities: [
        isCompiled
            ? path.join(__dirname, "/model/*.js")
            : path.join(__dirname, "/model/*.ts")
    ],
    migrations: [],
    subscribers: [],
});
