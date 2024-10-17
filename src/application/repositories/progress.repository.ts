import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Progress as ProgressEntity,
  ProgressDocument,
} from '../../schemas/progress.schema';
import { IProgressRepository } from './progress.repository.interface';
import { IProgress } from '../../interfaces/progress.interface';

@Injectable()
export class ProgressRepository implements IProgressRepository {
  constructor(
    @InjectModel(ProgressEntity.name)
    private progressModel: Model<ProgressDocument>,
  ) {}

  async save(progress: IProgress): Promise<void> {
    const newProgress = new this.progressModel(progress);
    await newProgress.save();
  }
  async findByAccountName(account_name: string): Promise<IProgress | null> {
    return this.progressModel.findOne({ account_name }).exec();
  }
}
