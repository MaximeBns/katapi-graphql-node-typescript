import Produit from "../../domain/entities/produit";
import RecupererLeProduit from "../recupererLeProduit";
import {produitPortTest} from "./helper/PortsTests";

describe('recupererLeProduit', () => {
    describe('exécuter : quand on récupère un produit par id', () => {
        it('alors retourne le produit', async () => {
            // given
            const produitPort = produitPortTest;
            const id = "1"
            const produitSauvegardé: Produit = {
                id: "1",
                nom: "Pomme",
                poids: 200,
                prix: 1
            };
            produitPort.récupérerLeProduit = jest.fn().mockReturnValue(produitSauvegardé)

            // when
            const produitRetourné = await new RecupererLeProduit(produitPort).exécuter(id);

            // then
            const produitAttendu = {
                id: "1",
                nom: "Pomme",
                poids: 200,
                prix: 1
            };
            expect(produitRetourné).toEqual(produitAttendu);
        });
    });
});
