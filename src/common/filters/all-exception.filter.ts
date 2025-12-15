import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg: unknown = exception['response'] || 'Internal server error';

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      statusCode: httpStatus,
      ip: requestIp.getClientIp(request),
      exception: exception['name'] || 'Error',
      timestamp: new Date().toISOString(),
      error: msg,
    };
    this.logger.error(
      `${request.method} ${request.url}`,
      responseBody,
      exception['name'] || 'Error',
    );
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
