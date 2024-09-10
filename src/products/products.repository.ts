import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.repository.create(createProductDto);
    return this.repository.save(product);
  }

  findAll() {
    return this.repository.findAndCount({
      where: { deleted_at: null },
    });
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: { id, deleted_at: null },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.repository.update({ id }, updateProductDto);
  }

  softDelete(id: string) {
    return this.repository.softDelete(id);
  }
}
