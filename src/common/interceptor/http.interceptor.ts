import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import type { Request, Response } from 'express';

type UnknownRecord = Record<string, unknown>;
type ReqWithUser = Request & {
  user?: { sub?: string; id?: string };
  requestId?: string;
};

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = ctx.switchToHttp();
    const req = http.getRequest<ReqWithUser>();

    return next.handle().pipe(
      map((data: unknown) => {
        // kalau handler sudah return { success: ... } → jangan di-wrap lagi
        if (
          data &&
          typeof data === 'object' &&
          'success' in (data as UnknownRecord)
        ) {
          return data;
        }

        // support pola { items, meta }
        const hasItemsMeta =
          data &&
          typeof data === 'object' &&
          'items' in (data as UnknownRecord) &&
          'meta' in (data as UnknownRecord);

        const payload = hasItemsMeta
          ? ((data as UnknownRecord)['items'] ?? data)
          : data;

        return {
          success: true,
          data: payload,
          path: req.url ?? '',
          timestamp: new Date().toISOString(),
          ...(hasItemsMeta ? { meta: (data as UnknownRecord)['meta'] } : null),
        };
      }),
    );
  }
}
