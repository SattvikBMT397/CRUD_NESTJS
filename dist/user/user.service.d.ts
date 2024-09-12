import { HttpStatus } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<{
        msg: string;
        status: HttpStatus;
        data: User;
    }>;
    findAllUsers(): Promise<User[]>;
    findOne(id?: string, email?: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        status: HttpStatus;
        message: string;
        result: User;
    }>;
    deleteUser(id: string): Promise<{
        status: HttpStatus;
        message: string;
        ID: string;
    }>;
    restoreUser(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
