import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRmqConfig } from './configs/rmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.media.env' }),
    // TypeOrmModule.forRootAsync(typeOrmConfig),
    RMQModule.forRootAsync(getRmqConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
