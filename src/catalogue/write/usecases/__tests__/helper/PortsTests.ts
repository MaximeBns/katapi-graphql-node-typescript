import ProduitPort from "../../../domain/ports/produitPort";
import CommandePort from "../../../domain/ports/commandePort";
import {IdGenerator} from "../../../domain/ports/idGenerator";

export const produitPortTest: ProduitPort = {
    sauvegarderProduit: jest.fn(),
    récupérerLeProduit: jest.fn()
}

export const commandePortTest: CommandePort = {
    sauvegarderCommande: jest.fn(),
}

export const idGeneratorTest: IdGenerator = {
    generate: jest.fn()
}

