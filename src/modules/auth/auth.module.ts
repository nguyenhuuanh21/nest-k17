import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterUseCase } from "./use-case/register.use-case";
import { LoginUseCase } from "./use-case/login.use-case";
import { UserModule } from "../users/user.module";
import { BcryptPasswordHasherStrategy } from "./strategies/hashing/brypt-password-hasher.strategy";
import { PasswordHasherStrategy } from "./strategies/hashing/password-hasher.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthTokenFactory } from "./factories/auth-token.factory";
import { SessionRepository } from "../sessions/repositories/session.repository";
import { LogoutUseCase } from "./use-case/logout.use-case";
import { RefreshTokenUseCase } from "./use-case/refresh-token.use-case";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt/jwt.strategy";

@Module({
    controllers:[AuthController],
    providers:[RegisterUseCase,LoginUseCase,LogoutUseCase,RefreshTokenUseCase,AuthTokenFactory,BcryptPasswordHasherStrategy,SessionRepository,JwtStrategy,{
        provide: PasswordHasherStrategy,
        useClass: BcryptPasswordHasherStrategy
    }],
    imports:[
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>({
                secret: config.get<string>('JWT_SECRET_KEY')||'jwt_secret_key',
                signOptions:{
                    expiresIn: Number(config.get<string>('JWT_EXPIRES_IN'))||6000
                }
            })
        })
    ]
})
export class AuthModule {}