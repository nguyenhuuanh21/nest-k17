import { IsEmail, IsNotEmpty, MinLength} from 'class-validator';
import { ValidationMessage } from '../../../common/constants/validation.messages';
export class CreateUserDto {
    @IsNotEmpty({message: ValidationMessage.EMAIL.REQUIRED})
    @IsEmail({}, {message: ValidationMessage.EMAIL.INVALID})
    email!: string;

    @IsNotEmpty({message: ValidationMessage.PASSWORD.REQUIRED})
    @MinLength(6, {message: ValidationMessage.PASSWORD.MIN_LENGTH})
    password!: string;
}