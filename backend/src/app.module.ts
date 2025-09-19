import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wallet } from './entities/wallet.entity';
import { Card } from './entities/card.entity';
import {HttpModule} from '@nestjs/axios'
import { CurrencyService } from './currency.service';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Wallet, Card, Transaction]),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSevice: ConfigService) => {
        return {
          global: true,
          secret: configSevice.get<JWTConfig>('jwt')!.secret,
          signOptions: { expiresIn: '60s' },
        }
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get<DatabaseConfig>('database')!
        return {
          type: 'mysql',
          host: db.host,
          port: db.port,
          username: db.user,
          password: db.password,
          database: db.name,
          autoLoadEntities: true,
          synchronize: true,
        }
      },
    }),

  ],
  controllers: [AppController],
  providers: [AppService, CurrencyService],
  exports: [CurrencyService]
})
export class AppModule { }
