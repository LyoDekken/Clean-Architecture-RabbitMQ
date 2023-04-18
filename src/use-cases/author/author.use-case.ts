import { Injectable } from '@nestjs/common';
import { Author } from '../../core/entities';
import { IDataServices } from '../../core/abstracts/IDataServices.abstract';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../../core/dtos';
import { AuthorService } from './author.use-case.service';

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

  async getAllAuthors(): Promise<Author[]> {
    return this.dataServices.authors.getAll();
  }

  async getAuthorById(id: string): Promise<Author> {
    return this.dataServices.authors.getById(id);
  }

  async getAuthorByEmail(email: string): Promise<Author> {
    return this.dataServices.authors.getByEmail(email);
  }
}
