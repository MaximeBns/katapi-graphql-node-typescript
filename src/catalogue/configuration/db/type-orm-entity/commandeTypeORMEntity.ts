import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import ElementCommandeTypeORMEntity from "./elementCommandeTypeORMEntity";
import Commande from "../../../domain/entities/commande/commande";

@Entity({name: 'commandes'})
export default class CommandeTypeORMEntity {
    @PrimaryColumn()
    readonly id: string

    @Column()
    statut: string

    @OneToMany(() => ElementCommandeTypeORMEntity, element => element.commande, {cascade: true})
    elements: ElementCommandeTypeORMEntity[]

    @Column({type: 'float'})
    poids: number

    @Column({type: 'float'})
    fraisDePort: number

    @Column({type: 'float'})
    montantTotal: number

    private constructor(id: string, statut: string, poids: number, fraisDePort: number, montantTotal: number, elements: ElementCommandeTypeORMEntity[]) {
        this.id = id
        this.statut = statut
        this.poids = poids
        this.fraisDePort = fraisDePort
        this.montantTotal = montantTotal
        this.elements = elements
    }

    static fromCommandeAvecElements(commande : Commande, elements: ElementCommandeTypeORMEntity[]) {
        return new CommandeTypeORMEntity(commande.id, commande.statut, commande.poids, commande.fraisDePort, commande.montantTotal, elements)
    }
}