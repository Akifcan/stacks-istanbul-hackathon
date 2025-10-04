import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'monoracle_cron_oracle'})
export class CronOracle {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    address: string

    @Column()
    frequency: string

}