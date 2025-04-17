import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
  SendMessageBatchCommand,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import {
  createCredentialChain,
  fromInstanceMetadata,
  fromEnv,
  fromTokenFile,
  fromContainerMetadata,
  fromIni,
  fromProcess,
  fromSSO,
} from '@aws-sdk/credential-providers';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

export class SQSManager {
  private sqs: SQSClient;
  private logger = new Logger(SQSManager.name);
  private readonly queueUrl: string;

  constructor(queuUrl) {
    this.queueUrl = queuUrl;

    this.sqs = new SQSClient({
      credentials: createCredentialChain(
        fromInstanceMetadata(),
        fromEnv(),
        fromSSO(),
        fromTokenFile(),
        fromIni(),
        fromProcess(),
        fromContainerMetadata(),
      ),
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
      const data = await this.sqs.send(new SendMessageCommand(params));
      this.logger.log(`Success, message sent. MessageID: ${data.MessageId}`);
    } catch (error) {
      this.logger.error(`Error sending message: ${error}`);
      throw new Error(error);
    }
  }

  async sendBulkMessages(messages: []) {
    try {
      const chunkSize = 10; // SQS allows a maximum of 10 messages per batch
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
        const data = await this.sqs.send(new SendMessageBatchCommand(params));
        this.logger.log(`Success, bulk messages sent. MessageID: ${data.Successful[0].MessageId}`);
      }
    } catch (error) {
      this.logger.error(`Error sending bulk messages: ${error}`);
      throw new Error(error);
    }
  }

  async receiveMessage() {
    try {
      const params = {
        // AttributeNames: ['SentTimestamp'],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ['All'],
        QueueUrl: this.queueUrl,
        // WaitTimeSeconds: 20,
      };

      const data = await this.sqs.send(new ReceiveMessageCommand(params));

      if (data && data.Messages && data.Messages.length > 0) {
        for (const i in data.Messages) {
          return data.Messages[i];
        }
      }
    } catch (error) {
      console.log(error);
      this.logger.error(`Error recieving message: ${error}`);
    }
  }

  async deleteMessage(receiptHandle: string) {
    try {
      const input = {
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle,
      };
      const command = new DeleteMessageCommand(input);
      await this.sqs.send(command);
    } catch (error) {
      this.logger.error(`Error deleting message: ${error}`);
    }
  }

  async getMessage() {
    return this.receiveMessage();
  }

  public setSqsForTesting(sqs: any) {
    this.sqs = sqs;
  }

  public getSqsForTesting() {
    return this.sqs;
  }

  public getQueueUrl(): string {
    return this.queueUrl;
  }
}
