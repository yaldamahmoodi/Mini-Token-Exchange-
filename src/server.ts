import app from "./app";
import {AppDataSource} from "./infrastructure/db/datasource";
import {pinoLogger} from "./presentation/shared/pino-logger";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await AppDataSource.initialize();
        pinoLogger.info("DataSource initialized");

        app.listen(PORT, () => {
            pinoLogger.info(`Server running on port ${PORT}`);
        });
    } catch (err) {
        pinoLogger.info(err, "Failed to initialize DataSource");
    }
}

startServer();
