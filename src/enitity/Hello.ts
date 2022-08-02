import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Hello {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: "Hello World"})
    message: string
}