import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { LightService } from './light.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('lights')
@UseGuards(JwtAuthGuard)
export class LightController {
  constructor(private readonly lightService: LightService) {}

  @Get()
  async getAll() {
    return await this.lightService.getAll();
  }

  @Post('/:location')
  changeState(
    @Param('location') location: string,
    @Query('status') status: boolean,
  ) {
    return this.lightService.changeState(location, status);
  }
}
