import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test-db')
  async test_db() {
    const count = await this.appService.test_db();
    return {
      db: 'ok',
      count: count,
    };
  }
}
