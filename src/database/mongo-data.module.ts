import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../core/abstracts/IDataServices.abstract';
import {
  Author,
  AuthorSchema,
  Book,
  BookSchema,
  Genre,
  GenreSchema,
} from './schema';
import { MongoDataServices } from './mongo-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Book.name, schema: BookSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/mongo'),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
