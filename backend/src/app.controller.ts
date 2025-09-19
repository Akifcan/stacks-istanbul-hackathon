import { Body, Controller, Get, Post, Query, Param, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { NewCardDto } from './dtos/new-card.dto';
import { CurrentWallet } from './decorators/current-wallet.decorator';

@Controller()
export class AppController {

  @Inject() appService: AppService

  @Get('create-account')
  createAccount() {
    return this.appService.createAccount()
  }

  @Post('save-card')
  saveCard(@CurrentWallet() currentWallet: string, @Body() newCardDto: NewCardDto){
    return this.appService.saveCard(currentWallet, newCardDto)
  }

  @Get('my-wallet')
  myWalelt(@CurrentWallet() currentWallet: string){
    return this.appService.myWallet(currentWallet)
  }

  @Get('saved-cards')
  savedCards(@CurrentWallet() currentWallet: string){
    return this.appService.savedCards(currentWallet)
  }

  @Post('mock-spend')
  mockSpend(@Body('cardId') cardId: string){
    return this.appService.mockSpend(cardId)
  }

}
