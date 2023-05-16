import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class NoContentInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      tap((data) => {
        if (data === null) {
          throw new HttpException('No Content', HttpStatus.NO_CONTENT);
        }
      }),
    );
  }
}
