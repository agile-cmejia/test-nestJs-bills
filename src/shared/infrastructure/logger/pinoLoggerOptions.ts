import { Request } from 'express';
import { CORRELATION_ID_HEADER } from '../../middleware/correlation-id/correlation-id.middleware';

export const pinoOptions = {
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
    customProps: (req: Request) => {
      return {
        correlationId: req[CORRELATION_ID_HEADER],
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
