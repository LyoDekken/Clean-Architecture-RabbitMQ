import { Injectable } from '@nestjs/common';
import { Author } from '../../core/entities';
import { IDataServices } from '../../core/abstracts/IDataServices.abstract';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../../core/dtos';
import { AuthorService } from './author.use-case.service';

type Return = {
  name: string;
  email: string;
};

@Injectable()
export class AuthorUseCases {
  constructor(
    private dataServices: IDataServices,
    private authorService: AuthorService,
  ) {}

  async createAuthor(data: CreateAuthorDTO): Promise<Author> {
    const author = await this.authorService.createNewAuthor(data);
    return this.dataServices.authors.create(author);
  }

  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDTO,
  ): Promise<Author> {
    const author = await this.authorService.updateAuthor(updateAuthorDto);
    return this.dataServices.authors.updateById(id, author);
  }

  async UpdateUserAvatar(id: string, data: string): Promise<Author> {
    const author = await this.authorService.updateAvatar(data);
    return await this.dataServices.authors.updateById(id, author);
  }

  async getAllAuthors(): Promise<Return[]> {
    const user = await this.dataServices.authors.getAll();

    const authors = user.map((user) => ({
      name: user.name,
      email: user.email,
    }));

    return authors;
  }

  async getAuthorById(id: string): Promise<Author> {
    return this.dataServices.authors.getById(id);
  }

  async getAuthorByEmail(email: string): Promise<Author> {
    return this.dataServices.authors.getByEmail(email);
  }
}
