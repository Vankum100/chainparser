import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ActionsService } from '../application/actions.service';
import { IProgress } from '../interfaces/progress.interface';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post('start')
  async startFetching(@Body() progressData: IProgress) {
    const { account_name, pos, offset } = progressData;

    if (!account_name || pos === undefined || offset === undefined) {
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }

    await this.actionsService.startFetching(progressData);
    return { message: 'Fetching started' };
  }

  @Post('stop')
  async stopFetching() {
    await this.actionsService.stopFetching();
    return { message: 'Fetching stopped' };
  }
}
