import {Column, Entity, PrimaryColumn} from "typeorm";
import Produit from "../../../write/domain/entities/produit";
import ProduitInformations from "../../../read/domain/entities/produitInformations";

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

	toProduitInformations(): ProduitInformations {
		return {
			id: this.id,
			nom: this.nom,
			prix: this.prix,
			poids: this.poids
		}
	}
}
