import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export default class ProduitTypeORMEntity {
	@PrimaryColumn()
	readonly id: string

	@Column()
	readonly nom: string

	@Column()
	prix: number

	@Column()
	poids: number
}
