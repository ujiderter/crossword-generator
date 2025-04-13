import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    value;
}