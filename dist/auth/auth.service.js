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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const user_repository_1 = require("../user/repositories/user.repository");
let AuthService = class AuthService {
    constructor(userRepository, jwt, config) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(createUserDto) {
        const existingUser = await this.userRepository.findOne(undefined, createUserDto.email);
        if (existingUser) {
            if (existingUser.deleted_at) {
                await this.userRepository.restoreUser(existingUser.id);
                return {
                    msg: "User Register successfully",
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
            msg: "Data Added successfully",
            status: common_1.HttpStatus.OK,
            data: userData,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        console.log(loginDto);
        try {
            const user = await this.userRepository.findOne(undefined, email);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found.');
            }
            console.log(user.password);
            console.log(password);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid password.');
            }
            const token = this.jwt.sign({ id: user.id }, {
                secret: 'HELLO',
                expiresIn: '1h',
            });
            return {
                msg: 'User login successful',
                status: common_1.HttpStatus.OK,
                data: token,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map