import { Model, UpdateQuery, QueryFilter } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Partial<TDocument>): Promise<TDocument> {
    const createdDocument = new this.model(document);
    return await createdDocument.save();
  }

  async findOne(filter: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filter)
      .lean<TDocument>(true)
      .exec();

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filter)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filter: QueryFilter<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filter, update, { new: true })
      .lean<TDocument>(true)
      .exec();

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filter)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findAll(filter: QueryFilter<TDocument>): Promise<TDocument[]> {
    return await this.model.find(filter).lean<TDocument[]>(true).exec();
  }

  async findOneAndDelete(filter: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filter)
      .lean<TDocument>(true)
      .exec();

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filter)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
