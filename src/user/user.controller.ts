import { Body, Controller, Res, Req, Post, Get, Param, Put, Query, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<Response> {
    const createdData = await this.userService.createUser(createUserDto);
    return res.send(createdData);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const users = await this.userService.findAllUsers();
    return res.send(users);
  }

  @Put('/update/:id') 
  async update( @Req() req: Request,@Res() res: Response,@Param('id') id: string, @Body() updateUserDto: UpdateUserDto
  ): Promise<Response> {
    const updateData = await this.userService.updateUser(id, updateUserDto);
    return res.send(updateData);
  }
  

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const user = await this.userService.findOne(id); 
    return res.send(user);
  }

  @Delete('/delete')
  async remove(@Req() req: Request, @Res() res: Response, @Query('id') id: string) {
    const deleteData = await this.userService.deleteUser(id);
    return res.send(deleteData);
  }


}

