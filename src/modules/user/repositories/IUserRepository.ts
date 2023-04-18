import { CreateUserEntity } from '../infra/entities/create-user.entity';
import { UserDocument } from '../infra/schema/user.schema';

export default interface IUserRepository {
  createUser(data: CreateUserEntity): Promise<UserDocument>;
  findById(id: string): Promise<UserDocument>;
  checkExistEmail(email: string): Promise<UserDocument>;
}
