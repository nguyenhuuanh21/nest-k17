import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterUseCase } from "./use-case/register.use-case";
import { LoginUseCase } from "./use-case/login.use-case";
import { UserModule } from "../users/user.module";
import { BcryptPasswordHasherStrategy } from "./strategies/brypt-password-hasher.strategy";
import { PasswordHasherStrategy } from "./strategies/password-hasher.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthTokenFactory } from "./factories/auth-token.factory";

@Module({
    controllers:[AuthController],
    providers:[RegisterUseCase,LoginUseCase,AuthTokenFactory,BcryptPasswordHasherStrategy,{
        provide: PasswordHasherStrategy,
        useClass: BcryptPasswordHasherStrategy
    }],
    imports:[
        UserModule,
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