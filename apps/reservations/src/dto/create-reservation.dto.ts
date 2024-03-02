import { Prop } from '@nestjs/mongoose';

export class CreateReservationDto {
  startDate: Date;
  endDate: Date;
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  invoiceId: string;
}
