import { HttpStatus } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: ProductsRepository);
    create(createProductDto: CreateProductDto): Promise<{
        msg: string;
        status: HttpStatus;
        data: import("./entities/product.entity").Products;
    }>;
    findAll(): Promise<{
        status: HttpStatus;
        message: string;
        totalData: number;
        result: import("./entities/product.entity").Products[];
    }>;
    findOne(id: string): Promise<{
        status: HttpStatus;
        message: string;
        result: import("./entities/product.entity").Products;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        status: HttpStatus;
        message: string;
        result: import("./entities/product.entity").Products;
    }>;
    remove(id: string): Promise<{
        status: HttpStatus;
        message: string;
        result: import("typeorm").UpdateResult;
    }>;
}
