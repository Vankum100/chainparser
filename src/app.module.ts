import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config/config.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRoot('mongodb://mongo:27017/eos-actions'),
    ActionsModule,
  ],
})
export class AppModule {}
