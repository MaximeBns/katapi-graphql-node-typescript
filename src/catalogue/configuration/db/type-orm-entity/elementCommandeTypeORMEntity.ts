import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import ProduitTypeORMEntity from "./produitTypeORMEntity";
import CommandeTypeORMEntity from "./commandeTypeORMEntity";

@Entity({name: 'element_commande'})
export default class ElementCommandeTypeORMEntity {
    @PrimaryColumn()
    readonly id: string

    @ManyToOne(() => CommandeTypeORMEntity, commande => commande.elements,{onDelete: 'CASCADE'})
    readonly commande: CommandeTypeORMEntity

    @ManyToOne(() => ProduitTypeORMEntity, {onDelete: 'CASCADE'})
    readonly produit: ProduitTypeORMEntity;

    @Column()
    quantité: number
}