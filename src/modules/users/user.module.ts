import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.usecase';
import { FindAllUsersUseCase } from './use-cases/find-all-users.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserRepository
  ],
})
export class UserModule {}
