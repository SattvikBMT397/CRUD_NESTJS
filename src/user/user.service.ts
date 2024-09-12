import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';  
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}  
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne(undefined, createUserDto.email);
    console.log("existingUser", existingUser); 
    
    if (existingUser) {
      if (existingUser.deleted_at) {
        await this.userRepository.restoreUser(existingUser.id);
        return {
          msg: "User Registered successfully",
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
      msg: "User registered successfully",
      status: HttpStatus.OK,
      data: userData,
    };
  }
  
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id?: string, email?: string): Promise<User> {
    const user = await this.userRepository.findOne(id, email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    return {
      status: HttpStatus.OK,
      message: "Data updated successfully",
      result: updatedUser,
    };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.softDeleteUser(id);
    return {
      status: HttpStatus.OK,
      message: "Data deleted successfully",
      ID: id,
    };
  }
  
  async restoreUser(id: string) {
    const restoredUser = await this.userRepository.restoreUser(id);
    return {
      status: HttpStatus.OK,
      message: restoredUser.message,
    };
  }
}
