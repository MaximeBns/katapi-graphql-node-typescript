import ProduitInformations from "../produitInformations";

export enum StatutCommande {
    EN_COURS = 'EN_COURS',
    PAYEE = 'PAYEE',
    ANNULEE = 'ANNULEE'
}

export class CommandeElementInformations {
    constructor(readonly id: string, readonly produit: ProduitInformations, readonly quantité: number) {}

    get produitId(): string {
        return this.produit.id
    }
}


export default class CommandeInformations {
    readonly id: string;
    readonly statut: StatutCommande;
    readonly elements: CommandeElementInformations[];

    private constructor(id: string) {
        this.id = id
        this.statut = StatutCommande.EN_COURS
        this.elements= []
    }

    static init(id: string): CommandeInformations {
        return new CommandeInformations(id)
    }

    ajouterElement(id: string, produit: ProduitInformations, quantité: number): void {
        this.elements.push(new CommandeElementInformations(id, produit, quantité))
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