import { Body, HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { LoginDto } from "../dto/login.dto";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
import { PasswordHasherStrategy } from "../strategies/hashing/password-hasher.strategy";
import { AuthTokenFactory } from "../factories/auth-token.factory";
import { SessionRepository } from "src/modules/sessions/repositories/session.repository";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasherStrategy: PasswordHasherStrategy,
        private readonly authTokenFactory: AuthTokenFactory,
        private readonly sessionRepository: SessionRepository
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
        //revoked old session
        await this.sessionRepository.revokeAllActiveByUserId(existingUser.id);

        const loginResponse = await this.authTokenFactory.createLoginResponse(existingUser);
        const hashedRefreshToken = await this.passwordHasherStrategy.hash(loginResponse.refreshToken);
        await this.sessionRepository.create({
            userId: existingUser.id,
            refreshTokenHash: hashedRefreshToken
        });
        return loginResponse
    }
}