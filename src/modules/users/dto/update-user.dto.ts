import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength} from 'class-validator';
export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({message: 'email is not empty'})
    @IsEmail({},{message: 'Invalid email format'})
    email?: string;

    @IsOptional()
    @IsNotEmpty({message: 'Password is not empty'})
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password?: string;

    @IsOptional()
    @IsNotEmpty({message: 'role is not empty'})
    @IsEnum(['ADMIN', 'USER'], {message: 'Role must be either ADMIN or USER'})
    role?: string;

    @IsOptional()
    @IsNotEmpty({message: 'status is not empty'})
    @IsEnum(['ACTIVE', 'BANNED'], {message: 'Status must be either ACTIVE or BANNED'})
    status?: string;
}