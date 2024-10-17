import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Action as ActionEntity,
  ActionDocument,
} from '../../schemas/action.schema';
import { IActionRepository } from './action.repository.interface';
import { Action } from '../../domain/action.entity';

@Injectable()
export class ActionRepository implements IActionRepository {
  constructor(
    @InjectModel(ActionEntity.name) private actionModel: Model<ActionDocument>,
  ) {}

  async save(action: Action): Promise<void> {
    const newAction = new this.actionModel(action);
    await newAction.save();
  }

  async findByTrxId(trx_id: string): Promise<Action | null> {
    return this.actionModel.findOne({ trx_id }).exec();
  }
}
