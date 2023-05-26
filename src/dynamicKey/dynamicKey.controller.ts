import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DynamicKeyService } from './dynamicKey.service';

@Controller('dynamicKey')
@UseGuards(JwtAuthGuard)
export class DynamicKeyController {
  constructor(private readonly dynamicKeyService: DynamicKeyService) {}

  @Get()
  async get() {
    const dynamicKey = await this.dynamicKeyService.getAll();

    return dynamicKey[0];
  }
}
