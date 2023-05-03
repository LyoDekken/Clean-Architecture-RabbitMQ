import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../core/dtos';
import { AuthorUseCases } from '../use-cases/author/author.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import RabbitmqServer from 'src/rabbitmq-server';
import * as crypto from 'crypto';
import * as fs from 'fs';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private authorUseCases: AuthorUseCases) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastra um Autor',
  })
  async createAuthor(@Body() authorDto: CreateAuthorDTO) {
    const server = new RabbitmqServer('amqp://admin:admin@localhost:5672');

    await server.start();

    await server.publishInQueue('server', JSON.stringify(authorDto));

    return this.authorUseCases.createAuthor(authorDto);
  }

  @Put(':id')
  updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDTO,
  ) {
    return this.authorUseCases.updateAuthor(id, updateAuthorDto);
  }

  @Put('file/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: async (req, file, callback) => {
          const fileHash = crypto.randomBytes(10).toString('base64');
          const fileName = `${fileHash}-${file.originalname}`;

          callback(null, fileName);
        },
      }),
    }),
  )
  async handleUpload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.deleteFile(id);

    const update = await this.authorUseCases.UpdateUserAvatar(
      id,
      file.filename,
    );

    return update;
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
  async getById(@Param('id') id: string) {
    return this.authorUseCases.getAuthorById(id);
  }

  @Get('avatar/:id')
  @ApiOperation({
    summary: 'Retorna um usuário pelo id',
  })
  async getAvatarById(@Param('id') id: string) {
    const user = await this.authorUseCases.getAuthorById(id);

    return user.avatar_url;
  }

  @Delete('file/:id')
  @ApiOperation({
    summary: 'Retorna um usuário pelo id',
  })
  async deleteFile(@Param('id') id: string) {
    const user = await this.authorUseCases.getAuthorById(id);

    const fileName = user.avatar_url; // Usa o nome do arquivo antigo salvo

    if (fs.existsSync(`./uploads/${fileName}`)) {
      await fs.promises.unlink(`./uploads/${fileName}`);
      return { message: 'Arquivo excluído com sucesso' };
    } else {
      console.log('O arquivo não existe');
      return { message: 'Arquivo não encontrado' };
    }
  }
}
