import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path'
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { nanoid } from 'nanoid'
import { ConfigService } from '@nestjs/config';
import {
  makeContractDeploy,
  makeSTXTokenTransfer,
  makeContractCall,
  broadcastTransaction,
  fetchCallReadOnlyFunction,
  Cl
} from "@stacks/transactions";
import { STACKS_TESTNET } from '@stacks/network';
import { Card } from './entities/card.entity';

@Injectable()
export class AppService {
  @Inject() configService: ConfigService

  @InjectRepository(Wallet) walletRepository: Repository<Wallet>
  @InjectRepository(Card) cardRepository: Repository<Card>

  private generateWallet(): Promise<NewWallet> {
    return new Promise((resolve) => {
      exec("npx stx make_keychain", (error, stdout) => {
        const result = JSON.parse(stdout)
        resolve(result)
      })
    })
  }

  private async deployContract() {
    const config = this.configService.get<ContractConfig>('contract')
    const path = join(__dirname, '../', '../', 'contract', 'StackLit.clar')
    const codeBody = readFileSync(path, 'utf-8');

    const transaction = await makeContractDeploy({
      contractName: `StackLit-${nanoid(10)}`,
      codeBody: codeBody,
      senderKey: config?.privateKey!,
      network: STACKS_TESTNET
    });

    const response = await broadcastTransaction({
      transaction,
      network: STACKS_TESTNET
    });


    return response
  }

  async createAccount() {
    const wallet = await this.generateWallet()
    const savedWallet = await this.walletRepository.save(this.walletRepository.create({
      address: wallet.keyInfo.address
    }))
    return {address: savedWallet.address, mnemonic: wallet.mnemonic}
    // const contract = await this.deployContract()
    // return contract
  }

}
