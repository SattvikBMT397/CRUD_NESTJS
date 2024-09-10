import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


describe('ProductController', () => {
    let controller: ProductsController;
    let service: ProductsService;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [ProductsController],
        providers: [{provide :ProductsService, useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },}],
      }).compile();
  
      controller = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
      });

   describe('create',()=>{
    it('create new product',async()=>{
        const createProductDto:CreateProductDto = { 
            title: 'Test Product', 
            category: 'Test Category', 
            subcategory: 'Test Subcategory', 
            description: 'Test Description', 
            status: 'available' 
          };
          const product = {id:'1',...createProductDto};

    })
   })

})