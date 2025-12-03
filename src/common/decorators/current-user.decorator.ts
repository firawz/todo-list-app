import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface JwtPayload {
  id: string;
  username: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();
    console.log(data, '<== ini data');
    const user = request?.user;
    return data ? user?.[data] : user;
  },
);
