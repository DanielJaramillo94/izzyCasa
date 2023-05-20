import { Inconsistency } from './inconsistency.class';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BussisnessException extends HttpException {
  constructor(inconsistency: Inconsistency) {
    super(inconsistency.message, HttpStatus.BAD_REQUEST);
  }
}
