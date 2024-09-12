"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(createProductDto) {
        const product = await this.productRepository.create(createProductDto);
        return {
            msg: "Data Added successfully",
            status: common_1.HttpStatus.OK,
            data: product,
        };
    }
    async findAll() {
        const [products, count] = await this.productRepository.findAll();
        if (count === 0)
            throw new common_1.BadRequestException({ error: "Data Not Found" });
        return {
            status: common_1.HttpStatus.OK,
            message: "Data fetched successfully",
            totalData: count,
            result: products,
        };
    }
    async findOne(id) {
        const product = await this.productRepository.findOne(id);
        if (!product)
            throw new common_1.BadRequestException({ error: "Data Not Found" });
        return {
            status: common_1.HttpStatus.OK,
            message: "Data fetched successfully",
            result: product,
        };
    }
    async update(id, updateProductDto) {
        const result = await this.productRepository.update(id, updateProductDto);
        if (result.affected === 0)
            throw new common_1.BadRequestException({ error: "Data Not Found" });
        const updatedProduct = await this.productRepository.findOne(id);
        return {
            status: common_1.HttpStatus.OK,
            message: "Data updated successfully",
            result: updatedProduct,
        };
    }
    async remove(id) {
        const result = await this.productRepository.softDelete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: "Data deleted successfully",
            result,
        };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map