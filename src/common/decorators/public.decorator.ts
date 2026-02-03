import { SetMetadata } from '@nestjs/common';

// SetMetadata 用于自定义装饰器，给路由处理程序或控制器类添加元数据
// 这里用于标记路由处理程序或控制器类为公共路由，不需要守卫
export const Public = () => SetMetadata('isPublic', true);
