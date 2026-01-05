import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.url({ message: 'MONGODB_URI must be a valid URL' }),
  PORT: z
    .string()
    .optional()
    .transform((val) => Number(val) || 3333),
});

export type EnvConfig = z.infer<typeof envSchema>;

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (env): EnvConfig => {
        const result = envSchema.safeParse(env);

        if (!result.success) {
          const messages = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('; ');

          throw new Error(`Environment validation error:\n${messages}`);
        }

        return result.data;
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
