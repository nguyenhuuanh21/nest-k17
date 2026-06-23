import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Role, Status } from "src/generated/prisma/client";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "src/modules/auth/constants/auth.errors";
import { UserError } from "../constants/user.errors";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    async execute(id: number, data: UpdateUserDto,currentUser:{
        id: number,
        email: string,
        role: Role,
        status: Status
    }) {
        if(currentUser.role !== Role.ADMIN && currentUser.id !== id){
            throw new AppException(AuthError.FORBIDDEN)
        }
     
        const updateData: any = {
            // email: data.email,
            // role: data.role,
            // status: data.status,
        }
        if(data.email!==undefined){
            updateData.email = data.email;
        }
        if (data.password) {
            updateData.passwordHash = data.password;
        }
        if(currentUser.role === Role.ADMIN){
            if(data.role!==undefined){
                updateData.role = data.role;
            }
            if(data.status!==undefined){
                updateData.status = data.status;
            }
        }
        const user = await this.userRepository.updateUser(id, updateData);
        if(!user) {
            throw new AppException(UserError.USER_NOT_FOUND)
        }
        return UserMapper.toResponse(user);
    }
}