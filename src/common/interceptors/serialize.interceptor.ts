import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('这里是拦截器之前数据处理逻辑');
    return next.handle().pipe(
      map((data) => {
        console.log('这里是拦截器中的数据处理逻辑', data);
        delete data.password;
        return data;
      }),
    );
  }
}
