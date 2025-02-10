import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from './auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data for registration',
  })
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data for registration',
  })
  async register(@Body() userData: CreateUserDto): Promise<LoginResponse> {
    return this.authService.register(userData);
  }
}
