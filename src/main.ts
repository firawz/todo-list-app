import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpInterceptor } from './common/interceptor/http.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalInterceptors(app.get(HttpInterceptor));

  await app.listen(process.env.PORT ?? 3001);
  console.log('Application is running on port', process.env.PORT ?? 3001);
}
bootstrap();
