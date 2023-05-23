import { Light } from './light';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LightService } from './light.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { EventsBrokerService } from 'src/eventsBroker/eventsBroker.service';

@Controller('lights')
//@UseGuards(JwtAuthGuard)
export class LightController {
  constructor(private readonly lightService: LightService, 
    private readonly eventsBrokerService: EventsBrokerService 
    ) {}

  @Get()
  async getAll() {
    return await this.lightService.getAll();
  }

  @Post()
  create(@Body() light: Light) {
    return this.lightService.create(light);
  }

  @Patch()
  update(@Body() light: Light){
    return this.lightService.update(light);
  }
}