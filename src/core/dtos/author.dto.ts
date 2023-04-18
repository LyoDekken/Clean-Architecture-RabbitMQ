import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'Romário',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'e-mail do Usuário',
    example: 'user@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do Usuário',
    example: 'Abc@1234',
  })
  password: string;
}

export class UpdateAuthorDTO extends PartialType(CreateAuthorDTO) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'Romário',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'e-mail do Usuário',
    example: 'user@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do Usuário',
    example: 'Abc@1234',
  })
  password: string;
}
