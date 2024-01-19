import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    // for errors we don't know, we want to log it for debugging purposes

    console.error(err);
    res.status(400).send({
        errors: [{ message: 'something went wrong' }]
    });
};