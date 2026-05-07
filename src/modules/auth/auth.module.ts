import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterUseCase } from "./use-case/register.use-case";
import { LoginUseCase } from "./use-case/login.use-case";
import { UserRepository } from "../users/repositories/user.repository";
import { UserModule } from "../users/user.module";

@Module({
    controllers:[AuthController],
    providers:[RegisterUseCase,LoginUseCase],
    imports:[UserModule]
})
export class AuthModule {}