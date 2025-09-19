import { Body, Controller, Get, Post, Query, Param, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { NewCardDto } from './dtos/new-card.dto';
import { CurrentWallet } from './decorators/current-wallet.decorator';

@Controller()
export class AppController {

  @Inject() appService: AppService

  @Get('create-account')
  async createAccount() {
    return this.appService.createAccount()
  }

  @Post('save-card')
  async saveCard(@CurrentWallet() currentWallet: string, @Body() newCardDto: NewCardDto){
    return this.appService.saveCard(currentWallet, newCardDto)
  }

}
