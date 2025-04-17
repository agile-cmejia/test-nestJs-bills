import { SQSClient } from '@aws-sdk/client-sqs';
import 'dotenv/config';
export declare class SQSManager {
    private sqs;
    private logger;
    private readonly queueUrl;
    constructor(queuUrl: any);
    sendMessage(message: any): Promise<void>;
    sendBulkMessages(messages: []): Promise<void>;
    receiveMessage(): Promise<import("@aws-sdk/client-sqs").Message>;
    deleteMessage(receiptHandle: string): Promise<void>;
    getMessage(): Promise<import("@aws-sdk/client-sqs").Message>;
    setSqsForTesting(sqs: any): void;
    getSqsForTesting(): SQSClient;
    getQueueUrl(): string;
}
