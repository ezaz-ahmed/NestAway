import { LoggerModule as PinoLogger } from 'nestjs-pino';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PinoLogger.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
