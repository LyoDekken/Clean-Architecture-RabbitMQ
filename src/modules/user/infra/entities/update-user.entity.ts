import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEntity } from './create-user.entity';

export class UpdateUserEntity extends PartialType(CreateUserEntity) {}
