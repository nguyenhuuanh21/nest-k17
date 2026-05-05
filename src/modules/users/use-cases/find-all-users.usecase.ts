import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute() {
        const users=await this.userRepository.findAll();
        return users.map(user=>UserMapper.toResponse(user));
    }
}