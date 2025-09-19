import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('create-account')
  async createAccount() {
    return this.appService.createAccount()
  }

}
