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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        const existingUser = await this.userRepository.findOne(undefined, createUserDto.email);
        console.log("existingUser", existingUser);
        if (existingUser) {
            if (existingUser.deleted_at) {
                await this.userRepository.restoreUser(existingUser.id);
                return {
                    msg: "User Registered successfully",
                    status: common_1.HttpStatus.OK,
                    data: existingUser,
                };
            }
            throw new common_1.ConflictException('User with this email already exists.');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = Object.assign(Object.assign({}, createUserDto), { password: hashedPassword });
        const userData = await this.userRepository.createUser(newUser);
        return {
            msg: "User registered successfully",
            status: common_1.HttpStatus.OK,
            data: userData,
        };
    }
    async findAllUsers() {
        return await this.userRepository.findAllUsers();
    }
    async findOne(id, email) {
        const user = await this.userRepository.findOne(id, email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateUser(id, updateUserDto) {
        const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
        return {
            status: common_1.HttpStatus.OK,
            message: "Data updated successfully",
            result: updatedUser,
        };
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOne(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.userRepository.softDeleteUser(id);
        return {
            status: common_1.HttpStatus.OK,
            message: "Data deleted successfully",
            ID: id,
        };
    }
    async restoreUser(id) {
        const restoredUser = await this.userRepository.restoreUser(id);
        return {
            status: common_1.HttpStatus.OK,
            message: restoredUser.message,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map