import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength} from 'class-validator';
import { ValidationMessage } from '../../../common/constants/validation.messages';
import { Role, Status } from 'src/generated/prisma/client';
export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({message: ValidationMessage.EMAIL.REQUIRED})
    @IsEmail({}, {message: ValidationMessage.EMAIL.INVALID})
    email?: string;

    @IsOptional()
    @IsNotEmpty({message: ValidationMessage.PASSWORD.REQUIRED})
    @MinLength(6, {message: ValidationMessage.PASSWORD.MIN_LENGTH})
    password?: string;

    @IsOptional()
    @IsNotEmpty({message: ValidationMessage.ROLE.REQUIRED})
    @IsEnum(Role, {message: ValidationMessage.ROLE.INVALID})
    role?: string;

    @IsOptional()
    @IsNotEmpty({message: ValidationMessage.STATUS.REQUIRED})
    @IsEnum(Status, {message: ValidationMessage.STATUS.INVALID})
    status?: string;
}