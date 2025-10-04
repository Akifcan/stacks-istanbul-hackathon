import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'monoracle_coords'})
export class Coords {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    lat: number

    @Column()
    long: number

    @Column({name: 'last_location_description'})
    lastLocationDescription: string
}