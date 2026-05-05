import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class FindUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(id: number) {
        const user = await this.userRepository.findOne(id);
        return UserMapper.toResponse(user);
    }
}