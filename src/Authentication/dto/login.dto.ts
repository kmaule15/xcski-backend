import { IsString, MinLength, MaxLength, IsNotEmpty, Max } from 'class-validator'

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(32, { message: 'Password is too long' })
    password: string
}