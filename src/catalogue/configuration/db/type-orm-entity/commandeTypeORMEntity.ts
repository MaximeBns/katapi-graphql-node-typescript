import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import ElementCommandeTypeORMEntity from "./elementCommandeTypeORMEntity";

@Entity({name: 'commandes'})
export default class CommandeTypeORMEntity {
    @PrimaryColumn()
    readonly id: string

    @Column()
    statut: string

    @OneToMany(() => ElementCommandeTypeORMEntity, element => element.commande)
    elements: ElementCommandeTypeORMEntity[]

    @Column()
    poids: number

    @Column()
    fraisDePort: number

    @Column()
    montantTotal: number
}