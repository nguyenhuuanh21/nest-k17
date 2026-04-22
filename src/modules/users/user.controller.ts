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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser({
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
    const users = await this.userService.findAll();
    return {
      message: 'Users retrieved successfully',
      status: 'success',
      data: users,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(Number(id));
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
    const user= await this.userService.updateUser(Number(id), body);
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
    return await this.userService.deleteUser(Number(id));
  }
}
