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

    @Column({type: 'float'})
    poids: number

    @Column({type: 'float'})
    fraisDePort: number

    @Column({type: 'float'})
    montantTotal: number
}