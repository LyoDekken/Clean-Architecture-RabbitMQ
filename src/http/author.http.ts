import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../core/dtos';
import { AuthorUseCases } from '../use-cases/author/author.use-case';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private authorUseCases: AuthorUseCases) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastra um Autor',
  })
  createAuthor(@Body() authorDto: CreateAuthorDTO) {
    return this.authorUseCases.createAuthor(authorDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDTO,
  ) {
    return this.authorUseCases.updateAuthor(id, updateAuthorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna todos os usuários',
  })
  async getAll() {
    return this.authorUseCases.getAllAuthors();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna um usuário pelo id',
  })
  async getById(@Param('id') id: any) {
    return this.authorUseCases.getAuthorById(id);
  }
}
