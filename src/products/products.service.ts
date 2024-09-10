import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    return {
      msg: "Data Added successfully",
      status: HttpStatus.OK,
      data: product,
    };
  }

  async findAll() {
    const [products, count] = await this.productRepository.findAll();
    if (count === 0) throw new BadRequestException({ error: "Data Not Found" });
    return {
      status: HttpStatus.OK,
      message: "Data fetched successfully",
      totalData: count,
      result: products,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new BadRequestException({ error: "Data Not Found" });
    return {
      status: HttpStatus.OK,
      message: "Data fetched successfully",
      result: product,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(id, updateProductDto);
    if (result.affected === 0) throw new BadRequestException({ error: "Data Not Found" });
    const updatedProduct = await this.productRepository.findOne(id);

    return {
      status: HttpStatus.OK,
      message: "Data updated successfully",
      result: updatedProduct,
    };
  }

  async remove(id: string) {
    const result = await this.productRepository.softDelete(id);
    return {
      status: HttpStatus.OK,
      message: "Data deleted successfully",
      result,
    };
  }
}
