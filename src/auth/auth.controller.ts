import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 @Public()
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
