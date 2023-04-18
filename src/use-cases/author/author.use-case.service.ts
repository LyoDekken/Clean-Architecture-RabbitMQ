import { BadRequestException, Injectable } from '@nestjs/common';
import { Author } from '../../core/entities';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../../core/dtos';
import * as bcrypt from 'bcrypt';
import { IDataServices } from 'src/core/abstracts/IDataServices.abstract';

@Injectable()
export class AuthorService {
  constructor(private dataServices: IDataServices) {}

  async createNewAuthor(data: CreateAuthorDTO) {
    const author = new Author();

    const hashPassword = await bcrypt.hash(data.password, 10);

    author.name = data.name;
    author.email = data.email;
    author.password = hashPassword;

    return author;
  }

  async updateAuthor(data: UpdateAuthorDTO) {
    const author = new Author();

    const hashPassword = await bcrypt.hash(data.password, 10);

    author.name = data.name;
    author.email = data.email;
    author.password = hashPassword;

    return author;
  }

  async verify(email: string) {
    const verify = await this.dataServices.authors.getByEmail(email);

    if (verify) {
      throw new BadRequestException('User already exists.');
    }

    return verify;
  }
}
