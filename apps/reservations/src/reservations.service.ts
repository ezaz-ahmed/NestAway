import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Types } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    const { placeId, invoiceId, ...rest } = createReservationDto;

    return this.reservationsRepository.create({
      ...rest,
      placeId: new Types.ObjectId(placeId),
      invoiceId: new Types.ObjectId(invoiceId),
      userId: new Types.ObjectId('000000000000000000000000'),
    });
  }

  findAll() {
    return this.reservationsRepository.findAll({});
  }

  findOne(_id: Types.ObjectId) {
    return this.reservationsRepository.findOne({ _id });
  }

  update(_id: Types.ObjectId, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      {
        $set: updateReservationDto,
      },
    );
  }

  remove(_id: Types.ObjectId) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
