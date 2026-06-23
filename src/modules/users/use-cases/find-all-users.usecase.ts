import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { Role, Status } from "src/generated/prisma/client";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "src/modules/auth/constants/auth.errors";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute(currentUser:{
        id:number,
        email:string,
        role:Role,
        status:Status
    }) {
        if(currentUser.role !== Role.ADMIN){
            throw new AppException(AuthError.FORBIDDEN)
        }
        const users=await this.userRepository.findAll();
        return users.map(user=>UserMapper.toResponse(user));
    }
}