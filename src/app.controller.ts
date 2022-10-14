import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private amqpConnection: AmqpConnection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('publish')
  publiher() {
    this.amqpConnection.publish('amq.direct', 'pagamentos', {
      client: 'Wanderson Santos',
      amount: 10000,
    });

    console.log('mensagem publicada');

    return 'mensagem publicada';
  }
}
