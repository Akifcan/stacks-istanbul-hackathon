import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('stacklit_card')
export class Card {

        @PrimaryGeneratedColumn()
        id: number

        @Column({unique: true, name: 'card_id'})
        cardId: number
    
        @CreateDateColumn({name: 'created_at'})
        createdAt: Date

}