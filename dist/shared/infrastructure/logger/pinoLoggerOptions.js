"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoOptions = void 0;
const correlation_id_middleware_1 = require("./../../middleware/correlation-id/correlation-id.middleware");
exports.pinoOptions = {
    pinoHttp: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                levelFirst: true,
                translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
            },
        },
        autoLogging: false,
        customProps: (req) => {
            return {
                correlationId: req[correlation_id_middleware_1.CORRELATION_ID_HEADER],
            };
        },
        serializers: {
            req: () => {
                return undefined;
            },
            res: () => {
                return undefined;
            },
        },
    },
};
//# sourceMappingURL=pinoLoggerOptions.js.map