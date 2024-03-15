import {
  Body,
  Controller,
  Post,
  UseGuards,
  Param,
  Get,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import {
  AuthCredentialsDto,
  AuthLoginDto,
  IUser,
} from "./dto/auth-credentials.dto";

@Controller("api/v1")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/add-user")
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post("/signin")
  @HttpCode(200)
  signIn(
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<{ data: IUser; token: string }> {
    return this.authService.signIn(authLoginDto);
  }

  @UseGuards(AuthGuard())
  @Get("/get-user/:id")
  getUser(@Param("id") id: string): Promise<IUser> {
    return this.authService.getUser(id);
  }
}
