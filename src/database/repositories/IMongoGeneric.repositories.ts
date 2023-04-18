import { Model } from 'mongoose';
import { IGenericAbstract } from '../../core/abstracts/IGenericRepository.abstract';

export class MongoGenericRepository<T> implements IGenericAbstract<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  getById(id: string): Promise<T> {
    return this._repository.findById(id);
  }

  getByEmail(email: string): Promise<T> {
    return this._repository.findOne({ email }).exec();
  }

  updateById(id: string, item: T): Promise<T | null> {
    return this._repository.findByIdAndUpdate(id, item).exec();
  }
}
