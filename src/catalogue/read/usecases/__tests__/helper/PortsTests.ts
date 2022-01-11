import ProduitPort from "../../../domain/ports/produitPort";
import CommandePort from "../../../domain/ports/commandePort";

export const produitPortTest: ProduitPort = {
    récupérerLesProduits: jest.fn(),
    récupérerLeProduit: jest.fn()
}

export const commandePortTest: CommandePort = {
    récupérerCommande: jest.fn(),
    récupérerToutesLesCommandes: jest.fn()
}
