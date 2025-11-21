import {Response} from "express";
import {ZodError} from "zod";
import {DomainError} from "../../domain/errors/domain-error";
import {pinoLogger} from "./pino-logger";

export function handleError(err: any, res: Response) {
    if (err instanceof ZodError) {
        const message = err.issues[0]?.message || "Invalid input";
        return res.status(422).json({error: "ValidationError", message});
    }

    if (err instanceof DomainError) {
        return res.status(400).json({error: err.name, message: err.message});
    }

    pinoLogger.info(err, "Something went wrong");
    return res.status(500).json({error: "InternalServerError", message: "Something went wrong"});
}
