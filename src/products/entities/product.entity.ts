import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    subcategory: string;

    @Column()
    description: string;

    @Column()
    status : string;

    @DeleteDateColumn() 
    deleted_at?: Date;
}
