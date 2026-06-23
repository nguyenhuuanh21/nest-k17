import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { AuthError } from "src/modules/auth/constants/auth.errors";
import { AppException } from "src/common/exceptions/app.exception";
import { Role } from "src/generated/prisma/client";

@Injectable()
export class FindUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(id: number,currentUser:{
        id: number;
        email: string;
        role: string;
    }) {
        if(currentUser.role !== Role.ADMIN && currentUser.id !== id){
            throw new AppException(AuthError.FORBIDDEN);
        }
        const user = await this.userRepository.findOne(id);
        return UserMapper.toResponse(user);
    }
}