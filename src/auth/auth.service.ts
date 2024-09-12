import { Injectable, ForbiddenException, ConflictException, HttpStatus, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthDto } from './dto/auth.dto'; 

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne(undefined, createUserDto.email);
    if (existingUser) {
      if (existingUser.deleted_at) {
        await this.userRepository.restoreUser(existingUser.id);
        return {
          msg: "User Register successfully",
          status: HttpStatus.OK,
          data: existingUser,
        };
      }
      throw new ConflictException('User with this email already exists.');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };
    const userData = await this.userRepository.createUser(newUser);
    return {
      msg: "Data Added successfully",
      status: HttpStatus.OK,
      data: userData,
    };
  }

  async login(loginDto: AuthDto) {
    const { email, password } = loginDto;
    console.log(loginDto)
    try {
      const user = await this.userRepository.findOne(undefined, email);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }
      console.log(user.password);
      console.log(password)
    
      const isPasswordValid = await bcrypt.compare(password, user.password);   
      console.log(isPasswordValid); 
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password.');
      }

      const token = this.jwt.sign(
        { id: user.id },  
        {
          secret:'HELLO',  
          expiresIn: '1h',  
        }
      );
      return {
        msg: 'User login successful',
        status: HttpStatus.OK,
        data: token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
