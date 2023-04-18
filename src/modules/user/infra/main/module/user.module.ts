import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schema/user.schema';
import { UserController } from '../http/user.controller';
import { CreateUserService } from '../service/create-user.service';
import { UserRepository } from 'src/modules/user/repositories/implementations/UserRepository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [CreateUserService, UserRepository],
})
export class UserModule {}
