import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSwagger {
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
