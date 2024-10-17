import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgressDocument = Progress & Document;

@Schema()
export class Progress {
  @Prop({ unique: true })
  account_name: string;

  @Prop()
  pos: number;

  @Prop()
  offset: number;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
