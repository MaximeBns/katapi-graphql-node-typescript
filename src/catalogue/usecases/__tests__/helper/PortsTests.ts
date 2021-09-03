import ProduitPort from "../../../domain/ports/produitPort";

const produitPortTest: ProduitPort = {
    récupérerLesProduits: jest.fn(),
    sauvegarderProduit: jest.fn(),
    récupérerLeProduit: jest.fn()
}

export default produitPortTest;
