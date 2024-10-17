import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActionDocument = Action & Document;

@Schema()
export class Action {
  @Prop({ unique: true })
  trx_id: string;

  @Prop()
  block_time: string;

  @Prop()
  block_num: number;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
