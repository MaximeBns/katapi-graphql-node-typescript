import Produit from "../../domain/entities/produit";
import {produitPortTest} from "./helper/PortsTests";
import ProduitPort from "../../domain/ports/produitPort";
import RecupererLesProduits from "../recupererLesProduits/recupererLesProduits";

describe('recupererLesProduits', () => {
  describe('exécuter : quand on récupère les produits', () => {
    describe('alors retourne ', () => {
      let produitPort: ProduitPort
      let produitSauvegardés: Array<Produit>

      beforeEach(() => {
        produitPort = produitPortTest;
        produitSauvegardés = [{
          id: "1",
          nom: "Pomme",
          poids: 200,
          prix: 55
        }, {
          id: "2",
          nom: "Poire",
          poids: 100,
          prix: 1
        }, {
          id: "3",
          nom: "Poivre",
          poids: 300,
          prix: 23
        }, {
          id: "4",
          nom: "Poireau",
          poids: 400,
          prix: 12
        }, {
          id: "5",
          nom: "Patate",
          poids: 300,
          prix: 1.5
        }
        ];

        produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)
      })

      it(' tous les produits', async () => {
        // given
        produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)

        // when
        const produitRetourné = await new RecupererLesProduits(produitPort).exécuter();

        // then
        const produitsAttendus = [{
          id: "1",
          nom: "Pomme",
          poids: 200,
          prix: 55
        }, {
          id: "2",
          nom: "Poire",
          poids: 100,
          prix: 1
        }, {
          id: "3",
          nom: "Poivre",
          poids: 300,
          prix: 23
        }, {
          id: "4",
          nom: "Poireau",
          poids: 400,
          prix: 12
        }, {
          id: "5",
          nom: "Patate",
          poids: 300,
          prix: 1.5
        }];
        expect(produitRetourné).toEqual(produitsAttendus);
      })

    });
  });
});
