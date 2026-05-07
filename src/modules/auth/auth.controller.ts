import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUseCase } from "./use-case/register.use-case";
import { RegisterDto } from "./dto/register.dto";
import { LoginUseCase } from "./use-case/login.use-case";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUseCase:RegisterUseCase,
        private readonly loginUseCase:LoginUseCase 
    ){}
    @Post("/register")
    async register(@Body() body:RegisterDto){
        return await this.registerUseCase.execute(body);
    }
    @Post("/login")
    async login(@Body() body:LoginDto){
        return await this.loginUseCase.execute(body);
    }
}