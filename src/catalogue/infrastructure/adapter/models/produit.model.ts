import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class ProduitModel {
	@PrimaryGeneratedColumn()
	id: string
	@Column()
	nom: string
	@Column()
	prix: number
	@Column()
	poids: number
}
