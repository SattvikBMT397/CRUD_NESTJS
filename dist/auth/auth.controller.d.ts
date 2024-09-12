import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(dto: CreateUserDto): Promise<{
        msg: string;
        status: HttpStatus;
        data: import("../user/entities/user.entity").User;
    }>;
    signin(dto: AuthDto): Promise<{
        msg: string;
        status: HttpStatus;
        data: string;
    }>;
}
