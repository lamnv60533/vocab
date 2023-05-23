import { Param, Response } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('infra')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/code-pipeline')
  getCodePipeline() {
    return this.appService.configPipeline();
  }

  @Get('/dynamodb/:item')
  getDynamoDb(@Param('item') item: string) {
    return this.appService.getDynamoDBItem(item);
  }
  @Post('/dynamodb')
  postDynamoDb() {
    return this.appService.scanDynamoDB();
  }
}
