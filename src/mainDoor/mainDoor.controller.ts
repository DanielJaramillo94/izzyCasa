import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { MainDoorService } from './mainDoor.service';

@Controller('lockMainDoor')
@UseGuards(JwtAuthGuard)
export class MainDoorController {
  constructor(private readonly mainDoorainService: MainDoorService) {}

  @Post()
  async lockMainDoor() {
    return this.mainDoorainService.lockMainDoor();    
  }

}