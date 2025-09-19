import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CurrencyService {

    @Inject() httpService: HttpService

    async getSTXinUSD(){
        const response = await lastValueFrom(this.httpService.get('https://api.coinbase.com/v2/exchange-rates?currency=STX')) 
        return Number(response.data.data.rates.USD)
    }

}