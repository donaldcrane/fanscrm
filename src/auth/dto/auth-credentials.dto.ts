import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(4)
  @IsEmail()
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(6)
  phone: string;

  @IsString()
  @MinLength(5)
  @MaxLength(32)
  password: string;
}

export class AuthLoginDto {
  @IsString()
  @MinLength(4)
  @IsEmail()
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(32)
  password: string;
}

export interface IUser {
  id?: string;
  email: string;
  name: string;
  phone: string;
}
