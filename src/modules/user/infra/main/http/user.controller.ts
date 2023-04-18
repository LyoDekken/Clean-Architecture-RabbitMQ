import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserService } from '../service/create-user.service';
import { UserSwagger } from '../../swagger/user.swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly create_User: CreateUserService) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastra um usuário',
  })
  createUser(@Body() data: UserSwagger) {
    return this.create_User.execute(data);
  }
}
