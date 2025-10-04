import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'monoracle_match_score'})
export class MatchScore {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'score_1'})
    score1: number

    @Column({name: 'score_2'})
    score2: number
}