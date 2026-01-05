import { Type } from 'class-transformer';
import { IsMongoId, IsDate, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @IsMongoId()
  @IsNotEmpty()
  placeId: string;

  @IsMongoId()
  @IsNotEmpty()
  invoiceId: string;
}
