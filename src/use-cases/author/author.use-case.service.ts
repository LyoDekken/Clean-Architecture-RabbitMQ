import { BadRequestException, Injectable } from '@nestjs/common';
import { Author } from '../../core/entities';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../../core/dtos';
import { IDataServices } from '../../core/abstracts/IDataServices.abstract';

@Injectable()
export class AuthorService {
  constructor(private dataServices: IDataServices) {}

  async createNewAuthor(data: CreateAuthorDTO) {
    await this.verify(data.email);

    const author = new Author();

    author.name = data.name;
    author.email = data.email;
    author.avatar_url = '_';

    return author;
  }

  async updateAvatar(data: string) {
    const author = new Author();

    author.avatar_url = data;

    return author;
  }

  async updateAuthor(data: UpdateAuthorDTO) {
    const author = new Author();

    author.name = data.name;
    author.email = data.email;

    return author;
  }

  async verify(email: string) {
    const verify = await this.dataServices.authors.getByEmail(email);

    if (verify) {
      throw new BadRequestException(
        `Um usuário já está cadastrado com o email: ${email}`,
      );
    }

    return verify;
  }
}
