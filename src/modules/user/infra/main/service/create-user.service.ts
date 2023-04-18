import { BadRequestException, Injectable } from '@nestjs/common';
import IUserRepository from 'src/modules/user/repositories/IUserRepository';
import { UserSwagger } from '../../swagger/user.swagger';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserSwagger) {
    const verifyEmail = await this.userRepository.checkExistEmail(data.email);

    if (verifyEmail) {
      throw new BadRequestException('User already exists.');
    }

    if (data.password != data.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete data.confirmPassword;

    const hashPassword = await bcrypt.hash(data.password, 10);

    data.password = hashPassword;

    const user = await this.userRepository.createUser(data);

    return user;
  }
}
