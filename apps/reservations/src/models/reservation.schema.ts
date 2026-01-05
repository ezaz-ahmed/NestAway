import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ReservationDocument extends AbstractDocument {
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Place', required: true })
  placeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Invoice', required: true })
  invoiceId: Types.ObjectId;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
