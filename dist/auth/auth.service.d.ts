import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/repositories/user.repository';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private jwt;
    private config;
    constructor(userRepository: UserRepository, jwt: JwtService, config: ConfigService);
    signup(createUserDto: CreateUserDto): Promise<{
        msg: string;
        status: HttpStatus;
        data: import("../user/entities/user.entity").User;
    }>;
    login(loginDto: AuthDto): Promise<{
        msg: string;
        status: HttpStatus;
        data: string;
    }>;
}
