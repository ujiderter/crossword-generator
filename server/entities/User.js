import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Crossword } from './Crossword.js';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column({ unique: true })
    username;

    @Column()
    email;

    @OneToMany(() => Crossword, crossword => crossword.user)
    crosswords;
}