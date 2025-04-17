import { NextFunction, Request, Response } from 'express';
import { NestMiddleware } from '@nestjs/common';
export declare const CORRELATION_ID_HEADER = "X-Correlation-Id";
export declare class CorrelationIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
