import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dto/user-create.dto";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    async execute(data: CreateUserDto) {
        const user = await this.userRepository.createUser({
            email: data.email,
            passwordHash: data.password,
        });
        return UserMapper.toResponse(user);
    }
}