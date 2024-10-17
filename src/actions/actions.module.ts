import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ActionsService } from '../application/actions.service';
import { ActionSchema } from '../schemas/action.schema';
import { ProgressSchema } from '../schemas/progress.schema';
import { ActionRepository } from '../application/repositories/action.repository';
import { ProgressRepository } from '../application/repositories/progress.repository';
import { ActionsController } from './actions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Action', schema: ActionSchema }]),
    MongooseModule.forFeature([{ name: 'Progress', schema: ProgressSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    ActionsService,
    {
      provide: 'IActionRepository',
      useClass: ActionRepository,
    },
    {
      provide: 'IProgressRepository',
      useClass: ProgressRepository,
    },
  ],
  controllers: [ActionsController], // Register the controller
})
export class ActionsModule {}
