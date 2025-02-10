import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = {
      name: user.name,
      sub: user._id,
      role: user.role,
      branchId: user.branch,
    };
    return {
      name: user.name,
      access_token: this.jwtService.sign(payload),
      role: user.role,
      branchId: user.branch,
    };
  }

  async register(userData: CreateUserDto): Promise<LoginResponse> {
    const user = await this.usersService.create(userData);
    return this.login(user);
  }
}
