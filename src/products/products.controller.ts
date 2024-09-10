import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Res, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() createProductDto: CreateProductDto) {
    const createData = await this.productsService.create(createProductDto);
    return res.send(createData);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const findAll = await this.productsService.findAll();
    return res.send(findAll);
  }

  @Get('/getOne')
  async findOne(@Req() req: Request, @Res() res: Response, @Query('id') id: string) {
    const getOne = await this.productsService.findOne(id);
    return res.send(getOne);
  }

  @Put('/update')
  async update(@Req() req: Request, @Res() res: Response, @Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updateData = await this.productsService.update(id, updateProductDto);
    return res.send(updateData);
  }

  @Patch('/update-partial')
  async partialUpdate(@Req() req: Request, @Res() res: Response, @Query('id') id: string, @Body() updateProductDto: Partial<UpdateProductDto>) {
    const updateData = await this.productsService.update(id, updateProductDto);
    return res.send(updateData);
  }

  @Delete('/delete')
  async remove(@Req() req: Request, @Res() res: Response, @Query('id') id: string) {
    const deleteData = await this.productsService.remove(id);
    return res.send(deleteData);
  }
}
