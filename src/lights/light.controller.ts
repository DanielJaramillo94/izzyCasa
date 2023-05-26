import { Light } from './light';
import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
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

  @Post()
  create(@Body() light: Light) {
    return this.lightService.create(light);
  }

  @Patch()
  update(@Body() light: Light) {
    return this.lightService.update(light);
  }
}
