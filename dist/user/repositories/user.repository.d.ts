import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
export declare class UserRepository {
    private readonly repository;
    constructor(repository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findOne(id?: string, email?: string): Promise<User | undefined>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    softDeleteUser(id: string): Promise<{
        message: string;
    }>;
    restoreUser(id: string): Promise<{
        message: string;
    }>;
}
