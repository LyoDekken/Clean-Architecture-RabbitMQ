import { Author, Book, Genre } from '../entities';
import { IGenericAbstract } from './IGenericRepository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericAbstract<Author>;

  abstract books: IGenericAbstract<Book>;

  abstract genres: IGenericAbstract<Genre>;
}
