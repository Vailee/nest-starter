import { Injectable, PipeTransform } from '@nestjs/common';
/**
 * 自定义pipes
 * */
@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return;
    // 执行需要转换或国立逻辑
    return value;
  }
}
