import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "team" })
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, length: 30 })
    name: string;
}
