import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stacklit_wallet')
export class Wallet {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    address: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

}