import { Body, HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { LoginDto } from "../dto/login.dto";
import { UserMapper } from "src/modules/users/mappers/user.mapper";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
import { PasswordHasherStrategy } from "../strategies/password-hasher.strategy";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasherStrategy: PasswordHasherStrategy,
        private readonly jwtService: JwtService
    ){}
    async execute(@Body() body:LoginDto){
        const existingUser=await this.userRepository.findByEmail(body.email);
        if(!existingUser){
            throw new AppException(AuthError.INVALID_CREDENTIALS);
        }
        const isPasswordCorrect=await this.passwordHasherStrategy.compare(body.password,existingUser.passwordHash);
        if(!isPasswordCorrect){
            throw new AppException(AuthError.INVALID_CREDENTIALS);
        }
        const accessToken=await this.jwtService.signAsync({
            sub: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        });
        return {
            user: UserMapper.toResponse(existingUser),
            token: accessToken
        };
    }
}