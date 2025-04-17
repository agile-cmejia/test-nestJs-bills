"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQSManager = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const credential_providers_1 = require("@aws-sdk/credential-providers");
const common_1 = require("@nestjs/common");
require("dotenv/config");
class SQSManager {
    constructor(queuUrl) {
        this.logger = new common_1.Logger(SQSManager.name);
        this.queueUrl = queuUrl;
        this.sqs = new client_sqs_1.SQSClient({
            credentials: (0, credential_providers_1.createCredentialChain)((0, credential_providers_1.fromInstanceMetadata)(), (0, credential_providers_1.fromEnv)(), (0, credential_providers_1.fromSSO)(), (0, credential_providers_1.fromTokenFile)(), (0, credential_providers_1.fromIni)(), (0, credential_providers_1.fromProcess)(), (0, credential_providers_1.fromContainerMetadata)()),
        });
    }
    async sendMessage(message) {
        try {
            this.logger.log('Sending message...');
            const params = {
                DelaySeconds: 0,
                MessageBody: JSON.stringify(message),
                QueueUrl: this.queueUrl,
                MessageGroupId: message.groupId,
                MessageDeduplicationId: message.deduplicationId,
            };
            const data = await this.sqs.send(new client_sqs_1.SendMessageCommand(params));
            this.logger.log(`Success, message sent. MessageID: ${data.MessageId}`);
        }
        catch (error) {
            this.logger.error(`Error sending message: ${error}`);
            throw new Error(error);
        }
    }
    async sendBulkMessages(messages) {
        try {
            const chunkSize = 10;
            this.logger.log(`Messages lenght ${messages.length}`);
            for (let i = 0; i < messages.length; i += chunkSize) {
                const params = {
                    Entries: messages.slice(i, i + chunkSize).map((message, index) => {
                        return {
                            Id: (i + index).toString(),
                            MessageBody: JSON.stringify(message),
                        };
                    }),
                    QueueUrl: this.queueUrl,
                };
                const data = await this.sqs.send(new client_sqs_1.SendMessageBatchCommand(params));
                this.logger.log(`Success, bulk messages sent. MessageID: ${data.Successful[0].MessageId}`);
            }
        }
        catch (error) {
            this.logger.error(`Error sending bulk messages: ${error}`);
            throw new Error(error);
        }
    }
    async receiveMessage() {
        try {
            const params = {
                MaxNumberOfMessages: 10,
                MessageAttributeNames: ['All'],
                QueueUrl: this.queueUrl,
            };
            const data = await this.sqs.send(new client_sqs_1.ReceiveMessageCommand(params));
            if (data && data.Messages && data.Messages.length > 0) {
                for (const i in data.Messages) {
                    return data.Messages[i];
                }
            }
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Error recieving message: ${error}`);
        }
    }
    async deleteMessage(receiptHandle) {
        try {
            const input = {
                QueueUrl: this.queueUrl,
                ReceiptHandle: receiptHandle,
            };
            const command = new client_sqs_1.DeleteMessageCommand(input);
            await this.sqs.send(command);
        }
        catch (error) {
            this.logger.error(`Error deleting message: ${error}`);
        }
    }
    async getMessage() {
        return this.receiveMessage();
    }
    setSqsForTesting(sqs) {
        this.sqs = sqs;
    }
    getSqsForTesting() {
        return this.sqs;
    }
    getQueueUrl() {
        return this.queueUrl;
    }
}
exports.SQSManager = SQSManager;
//# sourceMappingURL=sqs.service.js.map