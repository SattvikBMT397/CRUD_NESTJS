import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    create(req: Request, res: Response, createUserDto: CreateUserDto): Promise<Response>;
    findAll(res: Response): Promise<Response>;
    update(req: Request, res: Response, id: string, updateUserDto: UpdateUserDto): Promise<Response>;
    findOne(id: string, res: Response): Promise<Response>;
    remove(req: Request, res: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
