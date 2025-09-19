import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentWallet = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const wallet = request.headers.wallet;
    return wallet;
  },
);