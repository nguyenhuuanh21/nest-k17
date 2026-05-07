import { Body, HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { LoginDto } from "../dto/login.dto";
import { UserMapper } from "src/modules/users/mappers/user.mapper";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";

@Injectable()
export class LoginUseCase {
    constructor(private readonly userRepository: UserRepository){}
    async execute(@Body() body:LoginDto){
        const existingUser=await this.userRepository.findByEmail(body.email);
        if(!existingUser){
            throw new AppException(AuthError.INVALID_CREDENTIALS);
        }
        if(existingUser.passwordHash!==body.password){
            throw new AppException(AuthError.INVALID_CREDENTIALS);
        }
        return {
            user: UserMapper.toResponse(existingUser),
            token:null
        };
    }
}