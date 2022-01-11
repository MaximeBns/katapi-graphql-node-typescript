import CommandePort from "../../domain/ports/commandePort";
import CreerUneCommande, {CommandeElementDepuisRequete} from "../creerUneCommande";
import ProduitPort from "../../domain/ports/produitPort";
import {commandePortTest, idGeneratorTest, produitPortTest} from "./helper/PortsTests";
import Produit from "../../domain/entities/produit";
import {IdGenerator} from "../../domain/ports/idGenerator";
import {uneCommandeAvecDeuxPommesEtTroisPoires} from "../../configuration/__tests__/utils";

describe('creerUneCommande', () => {
    let commandePort: CommandePort
    let produitPort: ProduitPort
    let idGenerator: IdGenerator
    let creerUneCommande: CreerUneCommande

    beforeEach(() => {
        produitPort = produitPortTest
        commandePort = commandePortTest
        idGenerator = idGeneratorTest
        creerUneCommande = new CreerUneCommande(commandePort, produitPort, idGenerator)
    })

    it('Quand la création se passe bien, retourner la commande créée', async () => {
        // Given
        const elements : CommandeElementDepuisRequete[] = [
            {idProduit: '1', quantite: 2},
            {idProduit: '2', quantite: 3}
        ]
        const pomme: Produit = {id:'1', nom: 'Pomme', prix: 2, poids: 0.2}
        const poire: Produit = {id:'2', nom: 'Poire', prix: 3, poids: 0.25}
        produitPort.récupérerLeProduit = jest.fn()
            .mockResolvedValueOnce(pomme)
            .mockResolvedValue(poire)
        idGenerator.generate = jest.fn()
            .mockReturnValueOnce('id')
            .mockReturnValueOnce('id-el-1')
            .mockReturnValue('id-el-2')

        // When
        const commande = await creerUneCommande.exécuter(elements)


        // Then
        const expectedCommande = uneCommandeAvecDeuxPommesEtTroisPoires()
        expect(produitPort.récupérerLeProduit).toHaveBeenNthCalledWith(1, '1')
        expect(produitPort.récupérerLeProduit).toHaveBeenNthCalledWith(2, '2')
        expect(commandePort.sauvegarderCommande).toHaveBeenCalledWith(expectedCommande)
        expect(commande).toEqual(expectedCommande)
    })
})