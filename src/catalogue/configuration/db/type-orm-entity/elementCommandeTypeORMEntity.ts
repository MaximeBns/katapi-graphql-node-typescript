import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import ProduitTypeORMEntity from "./produitTypeORMEntity";
import CommandeTypeORMEntity from "./commandeTypeORMEntity";

@Entity({name: 'element_commande'})
export default class ElementCommandeTypeORMEntity {
    @PrimaryColumn()
    readonly id: string

    @Column({name: 'commande_id'})
    readonly commandeId: string

    @ManyToOne(() => CommandeTypeORMEntity, commande => commande.elements,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'commande_id', referencedColumnName: 'id' })
    readonly commande: CommandeTypeORMEntity

    @Column({name: 'produit_id'})
    readonly produitId: string

    @ManyToOne(() => ProduitTypeORMEntity, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'produit_id', referencedColumnName: 'id' })
    readonly produit: ProduitTypeORMEntity;

    @Column()
    quantité: number

    constructor(id: string, commandeId: string, produitId: string, quantité: number) {
        this.id = id
        this.commandeId = commandeId
        this.produitId = produitId
        this.quantité = quantité
    }
}