import { Request } from 'express';
export declare const pinoOptions: {
    pinoHttp: {
        transport: {
            target: string;
            options: {
                colorize: boolean;
                levelFirst: boolean;
                translateTime: string;
            };
        };
        autoLogging: boolean;
        customProps: (req: Request) => {
            correlationId: any;
        };
        serializers: {
            req: () => any;
            res: () => any;
        };
    };
};
