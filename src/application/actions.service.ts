import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Inject } from '@nestjs/common';
import { IActionRepository } from './repositories/action.repository.interface';
import { IProgressRepository } from './repositories/progress.repository.interface';
import { Action } from '../domain/action.entity';
import { IProgress } from '../interfaces/progress.interface';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ActionsService {
  private fetching = false;
  private progressData: IProgress;

  constructor(
    @Inject('IActionRepository') private actionRepo: IActionRepository,
    @Inject('IProgressRepository') private progressRepo: IProgressRepository,
  ) {}

  async startFetching(progressData: IProgress) {
    this.progressData = progressData;
    this.fetching = true;
    await this.fetchAndSaveActions();
  }

  async stopFetching() {
    this.fetching = false;
  }

  @Cron('*/1 * * * *')
  async fetchAndSaveActions() {
    if (!this.fetching) return;

    const response = await axios.post(
      'https://eos.greymass.com/v1/history/get_actions',
      {
        account_name: this.progressData.account_name,
        pos: this.progressData.pos,
        offset: this.progressData.offset,
      },
    );

    const actions = response.data.actions;

    for (const action of actions) {
      const { trx_id, block_time, block_num } = action.action_trace;
      const existingAction = await this.actionRepo.findByTrxId(trx_id);

      if (!existingAction) {
        const newAction = new Action(trx_id, block_time, block_num);
        await this.actionRepo.save(newAction);
      }
    }

    const existingProgress = await this.progressRepo.findByAccountName(
      this.progressData.account_name,
    );
    if (!existingProgress) {
      await this.progressRepo.save(this.progressData);
    }
  }
}
