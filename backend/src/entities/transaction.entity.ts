import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";
import { Wallet } from "./wallet.entity";

@Entity('stacklit_transaction')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'transaction_id' })
    transactionId: string

    @Column()
    date: string

    @Column()
    description: string

    @Column({ name: 'merchant_name' })
    merchantName: string

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number

    @Column()
    currency: string

    @Column()
    category: string

    @Column()
    type: string

    @Column()
    status: string

    @ManyToOne(() => Card, card => card.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'card_id' })
    card: Card

    @ManyToOne(() => Wallet, wallet => wallet.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

}