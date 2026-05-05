import {
  Controller,
  Delete,
  Patch,
  Post,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindAllUsersUseCase } from './use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserById: FindUserByIdUseCase,
    private readonly updateUserUseCase:UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.execute({
      email: body.email,
      password: body.password,
    });
    if (!user) {
      return {
        message: 'User creation failed',
        status: 'error',
      };
    }
    return {
      message: 'User created successfully',
      status: 'success',
      data: user,
    };
  }
  @Get()
  async findAll() {
    const users = await this.findAllUsersUseCase.execute();
    return {
      message: 'Users retrieved successfully',
      status: 'success',
      data: users,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.findUserById.execute(Number(id));
    if(!user){
        return {
            message: 'User not found',
            status: 'error',
        }
    }
    return {
      message: 'User retrieved successfully',
      status: 'success',
      data: user,
    };
  }
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user= await this.updateUserUseCase.execute(Number(id), body);
    if(!user){
        return {
            message: 'User update failed',
            status: 'error',
        }
    }
    return {
      message: 'User updated successfully',
      status: 'success',
      data: user,
    };
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.deleteUserUseCase.execute(Number(id));
  }
}
