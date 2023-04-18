import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../infra/schema/user.schema';
import { UserSwagger } from '../../infra/swagger/user.swagger';
import IUserRepository from '../IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: UserSwagger): Promise<UserDocument> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findById(id: string): Promise<UserDocument> {
    const userId = await this.userModel.findById(id);

    return userId;
  }

  async checkExistEmail(email: string): Promise<UserDocument> {
    const userEmail = await this.userModel.findOne({ email }).exec();

    if (!userEmail) {
      throw new NotFoundException(
        `Usuário com email '${email}' não encontrado!`,
      );
    }

    return userEmail;
  }
}
