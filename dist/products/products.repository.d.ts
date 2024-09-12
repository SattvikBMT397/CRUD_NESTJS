import { Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsRepository {
    private readonly repository;
    constructor(repository: Repository<Products>);
    create(createProductDto: CreateProductDto): Promise<Products>;
    findAll(): Promise<[Products[], number]>;
    findOne(id: string): Promise<Products>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    softDelete(id: string): Promise<import("typeorm").UpdateResult>;
}
