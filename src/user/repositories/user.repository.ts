import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto); 
    await this.repository.save(user);
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.repository.find({ where: { deleted_at: null } });
  }

  async findOne(id?: string, email?: string): Promise<User | undefined> {
    if (id) {
      return await this.repository.findOne({ where: { id }, withDeleted: true });
    }
    if (email) {
      return await this.repository.findOne({ where: { email }, withDeleted: true });
    }
    throw new Error('Either id or email must be provided');
  }
  
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // const updateResult = await this.repository.update(id, updateUserDto); 
    const updatedUser = await this.repository.findOne({ where: { id }, withDeleted: true });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async softDeleteUser(id: string): Promise<{ message: string }> {
    const result = await this.repository.softDelete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found or already deleted.`);
    }
  
    return { message: `User with ID ${id} has been successfully deleted.` };
  }

  async restoreUser(id: string): Promise<{ message: string }> {
    const result = await this.repository.restore(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found or not soft-deleted.`);
    }

    return { message: `User with ID ${id} has been successfully restored.` };
  }
}
