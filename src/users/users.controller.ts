import { Controller, Get, UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserProfileDto } from './dto/user-profile.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser('id') id): Promise<UserProfileDto> {
    const data = await this.usersService.findById(id);
    if (!data) {
      // You might want to throw an exception here, e.g., NotFoundException
      throw new NotFoundException('User not found');
    }
    return new UserProfileDto(data);
  }
}
