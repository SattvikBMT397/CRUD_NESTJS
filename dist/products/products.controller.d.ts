import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from 'express';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(req: Request, res: Response, createProductDto: CreateProductDto): Promise<Response<any, Record<string, any>>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(req: Request, res: Response, id: string): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response, id: string, updateProductDto: UpdateProductDto): Promise<Response<any, Record<string, any>>>;
    partialUpdate(req: Request, res: Response, id: string, updateProductDto: Partial<UpdateProductDto>): Promise<Response<any, Record<string, any>>>;
    remove(req: Request, res: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
