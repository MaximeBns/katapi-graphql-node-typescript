import Produit from "../produit";

export enum StatutCommande {
    EN_COURS = 'EN_COURS',
    PAYEE = 'PAYEE',
    ANNULEE = 'ANNULEE'
}

export class CommandeElement {
    constructor(readonly id: string, readonly produit: Produit, readonly quantité: number) {}

    get produitId(): string {
        return this.produit.id
    }
}


export default class Commande {
    private constructor(readonly id: string, readonly statut: StatutCommande, readonly elements: CommandeElement[], readonly poids: number, readonly fraisDePort: number, readonly montantTotal: number) {

    }

    static init(id: string, statut: StatutCommande, poids: number, fraisDePort: number, montantTotal: number): Commande {
        return new Commande(id, statut, null, poids, fraisDePort, montantTotal)
    }

    static initAvecElements(id: string, statut: StatutCommande, elements: CommandeElement[]): Commande {
        const poids = elements.map(element => element.produit.poids*element.quantité)
                 .reduce((sum, current) => sum + current, 0)
        const montant = elements.map(element => element.quantité*element.produit.prix)
                 .reduce((sum, current) => sum + current, 0)
        return new Commande(id, statut, elements, poids, 2.5*poids, montant)
    }


    ajouterElement(id: string, produit: Produit, quantité: number): void {
        this.elements.push(new CommandeElement(id, produit, quantité))
    }
}