import Produit from "../produit";

export enum StatutCommande {
    EN_COURS = 'EN_COURS',
    PAYEE = 'PAYEE',
    ANNULEE = 'ANNULEE'
}

export class CommandeElement {
    constructor(readonly produit: Produit, readonly quantité: number) {
    }
}


export default class Commande {
    readonly id: string;
    readonly statut: StatutCommande;
    readonly elements: CommandeElement[];

    private constructor(id: string) {
        this.id = id
        this.statut = StatutCommande.EN_COURS
        this.elements= []
    }

    static init(id: string): Commande {
        return new Commande(id)
    }

    ajouterElement(produit: Produit, quantité: number): void {
        this.elements.push(new CommandeElement(produit, quantité))
    }

    get poids(): number {
        return this.elements.map(element => element.produit.poids*element.quantité)
            .reduce((sum, current) => sum + current, 0)
    }

    get fraisDePort(): number {
        return 2.5*this.poids
    }

    get montantTotal(): number {
        return this.elements.map(element => element.quantité*element.produit.prix)
            .reduce((sum, current) => sum + current, 0)
    }
}