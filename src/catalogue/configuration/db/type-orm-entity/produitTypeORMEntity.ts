import {Column, Entity, PrimaryColumn} from "typeorm";
import Produit from "../../../domain/entities/produit";

@Entity({name: 'produits'})
export default class ProduitTypeORMEntity {
	@PrimaryColumn()
	readonly id: string

	@Column()
	nom: string

	@Column({type: 'float'})
	prix: number

	@Column({type: 'float'})
	poids: number

	constructor(id: string, nom: string, prix: number, poids: number) {
		this.id = id
		this.nom = nom
		this.prix = prix
		this.poids = poids
	}

	static fromProduit(produit: Produit): ProduitTypeORMEntity {
		return new ProduitTypeORMEntity(produit.id, produit.nom, produit.prix, produit.poids)
	}

	get toProduit(): Produit {
		return {
			id: this.id,
			nom: this.nom,
			prix: this.prix,
			poids: this.poids
		}
	}
}
