import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateGenreDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateGenreDTO extends PartialType(CreateGenreDTO) {}
