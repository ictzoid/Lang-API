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
const bcrypt_1 = require("../../helpers/bcrypt");
const auth_repository_1 = require("./auth.repository");
const mailer_helper_service_1 = require("../mailer-helper/mailer-helper.service");
let AuthService = class AuthService {
    constructor(repository, emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }
    async CreateAccount(userDTO) {
        const { email, password } = userDTO;
        const existingUser = await this.repository.getUserByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists!');
        }
        const hashedPassword = await (0, bcrypt_1.passwordHasher)(password);
        const verifyLink = 'Hello here is the verification link';
        const input = {
            to: 'ictzoid@gmail.com',
            html: verifyLink,
            subject: 'Email/Account Verification'
        };
        await this.emailService.sendEmail(input);
        return 'Created successfully!';
    }
    async UserSignIn() {
        return { message: '' };
    }
    async UserVerification() {
        return { message: 'Email Verified' };
    }
    async SendVerificationEmail() {
        return { message: 'Verification Email Sent' };
    }
    async InitateForgotPassword() {
        return { message: 'password reset link sent to email' };
    }
    async ValidatePasswordReset() {
        return { message: 'Password reset initiated!' };
    }
    async UpdatePassword() {
        return { message: 'Password Reset Successful' };
    }
    async UserSignOut() {
        return { message: 'User logged out' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.authRepository,
        mailer_helper_service_1.MailerHelperService])
], AuthService);
//# sourceMappingURL=auth.service.js.map