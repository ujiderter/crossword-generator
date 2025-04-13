import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.js';

@Entity()
export class Crossword {
    @PrimaryGeneratedColumn()
    id;

    @Column('jsonb')
    grid;

    @Column('jsonb')
    words;

    @Column()
    size;

    @ManyToOne(() => User, user => user.crosswords)
    @JoinColumn()
    user;
}