import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity({name: 'stacklit_invest'})
export class Invest {

        @PrimaryGeneratedColumn()
        id: number

        @Column()
        spent: number
    
        @Column()
        bougth: number

            @ManyToOne(() => Wallet, wallet => wallet.id, { onDelete: 'CASCADE' })
            @JoinColumn({ name: 'wallet_id' })
            wallet: Wallet
        
                @Column({unique: true})
    transaction: string


        @CreateDateColumn({ name: 'created_at' })
        createdAt: Date
    

}