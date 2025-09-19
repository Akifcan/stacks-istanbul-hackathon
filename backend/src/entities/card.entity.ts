import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity('stacklit_card')
export class Card {

        @PrimaryGeneratedColumn()
        id: number

        @Column({unique: true, name: 'card_id'})
        cardId: string

        @Column({name: 'order_limit'})
        orderLimit: number
        
        @Column({name: 'starts_with'})
        startsWith: string

        @Column({unique: true})
        contract: string

        @ManyToOne(() => Wallet, wallet => wallet.id, {onDelete: 'CASCADE'})
        @JoinColumn({name: 'wallet_id'})
        wallet: Wallet
    
        @CreateDateColumn({name: 'created_at'})
        createdAt: Date

}