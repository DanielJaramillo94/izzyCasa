import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserId } from 'src/users/user';

export const UserParam = createParamDecorator<
  unknown,
  ExecutionContext,
  UserId
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.issuer;
});
