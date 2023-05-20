import { Controller, Get, Post, Body } from '@nestjs/common';
import { DynamicKeyService } from './dynamicKey.service';

@Controller('dynamicKey')
//@UseGuards(JwtAuthGuard)
export class DynamicKeyController {
  constructor(private readonly dynamicKeyService: DynamicKeyService, 
    ) {}

  @Get()
  async get() {
    const dynamicKey =  await this.dynamicKeyService.getAll();

    return dynamicKey[0];
  }
}