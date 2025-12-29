import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const errorFilter = configService.get<string>('ERROR_FILTER', 'true');
  const prefix = configService.get<string>('PREFIX', '');
  const cors = configService.get<boolean>('CORS', false);
  const versionStr = configService.get<string>('VERSION');
  let version = [versionStr];
  if (versionStr && versionStr.indexOf(',')) {
    version = versionStr.split(',').map((v) => v.trim());
  }

  if (cors) {
    app.enableCors();
  }

  // 设置全局路由前缀
  if (prefix) {
    app.setGlobalPrefix(prefix);
  }
  // 设置API版本
  app.enableVersioning({
    type: VersioningType.URI, // URI版本控制
    defaultVersion:
      typeof versionStr === 'undefined' ? VERSION_NEUTRAL : version,
  });

  if (errorFilter !== 'true') {
    const httpAdapter = app.get(HttpAdapterHost);

    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  }
  // 启用全局Winston日志记录
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
