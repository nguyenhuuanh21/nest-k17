import { Body, HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { LoginDto } from "../dto/login.dto";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
import { PasswordHasherStrategy } from "../strategies/password-hasher.strategy";
import { AuthTokenFactory } from "../factories/auth-token.factory";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasherStrategy: PasswordHasherStrategy,
        private readonly authTokenFactory: AuthTokenFactory,
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
        return await this.authTokenFactory.createLoginResponse(existingUser);
    }
}