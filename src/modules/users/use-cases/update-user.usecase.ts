import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    async execute(id: number, data: UpdateUserDto) {
        const updateData: any = {
            email: data.email,
            role: data.role,
            status: data.status,
        }
        if (data.password) {
            updateData.passwordHash = data.password;
        }
        const user = await this.userRepository.updateUser(id, updateData);
        return UserMapper.toResponse(user);
    }
}