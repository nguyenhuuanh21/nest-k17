import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUseCase } from "./use-case/register.use-case";
import { RegisterDto } from "./dto/register.dto";
import { LoginUseCase } from "./use-case/login.use-case";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { LogoutUseCase } from "./use-case/logout.use-case";
import { RefreshTokenUseCase } from "./use-case/refresh-token.use-case";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUseCase:RegisterUseCase,
        private readonly loginUseCase:LoginUseCase ,
        private readonly logoutUseCase:LogoutUseCase,
        private readonly refreshTokenUseCase:RefreshTokenUseCase
    ){}
    @Post("/register")
    async register(@Body() body:RegisterDto){
        return await this.registerUseCase.execute(body);
    }
    @Post("/login")
    async login(@Body() body:LoginDto){
        return await this.loginUseCase.execute(body);
    }
    @Post("/logout")
    async logout(@Body() body:RefreshTokenDto){
        return await this.logoutUseCase.execute(body);
    }
      @Post("/refresh-token")
    async refreshToken(@Body() body:RefreshTokenDto){
        return await this.refreshTokenUseCase.execute(body);
    }
}