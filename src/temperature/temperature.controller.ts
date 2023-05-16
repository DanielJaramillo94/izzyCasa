import { Temperature } from './temperature';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('temperature')
@UseGuards(JwtAuthGuard)
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Get()
  async getAll() {
    return await this.temperatureService.getAll();
  }

  @Post()
  create(@Body() temperature: Temperature) {
    return this.temperatureService.create(temperature);
  }
}
