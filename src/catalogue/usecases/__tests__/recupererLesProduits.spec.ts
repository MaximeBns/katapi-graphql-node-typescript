import Produit from "../../domain/entities/produit";
import produitPortTest from "./helper/PortsTests";
import ProduitAdapter from "../../infrastructure/adapter/ProduitAdapter";
import ProduitPort from "../../domain/ports/produitPort";
import RecupererLesProduits from "../recupererLesProduits/recupererLesProduits";
import {FilteredProductFilled, FiltreProduit, OrderType} from "../recupererLesProduits/filtreProduit";

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

      it(' tous les produits', () => {
        // given
        produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)

        // when
        const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter();

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

      describe(" filtré ", () => {
        describe("par ordre", () => {
          it("de nom croissant", () => {
            //given
            const filter: FiltreProduit = {
              by: FilteredProductFilled.Name,
              order: OrderType.Asc,
              contains: "po",
            }

            // when
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

            // then
            const produitsAttendus = [{
              id: "2",
              nom: "Poire",
              poids: 100,
              prix: 1
            }, {
              id: "4",
              nom: "Poireau",
              poids: 400,
              prix: 12
            }, {
              id: "3",
              nom: "Poivre",
              poids: 300,
              prix: 23
            }, {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 55
            }];

            expect(produitRetourné).toEqual(produitsAttendus);
          })

          it("de nom décroissant", () => {
            //given
            const filter: FiltreProduit = {
              by: FilteredProductFilled.Name,
              order: OrderType.Desc,
              contains: "po",
            }

            // when
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

            // then
            const produitsAttendus = [{
              id: "2",
              nom: "Poire",
              poids: 100,
              prix: 1
            }, {
              id: "4",
              nom: "Poireau",
              poids: 400,
              prix: 12
            }, {
              id: "3",
              nom: "Poivre",
              poids: 300,
              prix: 23
            }, {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 55
            }].reverse();

            expect(produitRetourné).toEqual(produitsAttendus);
          })

          it("prix croissant", () => {
            //Given
            const filter: FiltreProduit = {
              by: FilteredProductFilled.Prix,
              contains: "po",
              order: OrderType.Asc,
            }

            //When
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

            //Then
            const produitsAttendus = [{
              id: "2",
              nom: "Poire",
              poids: 100,
              prix: 1
            }, {
              id: "4",
              nom: "Poireau",
              poids: 400,
              prix: 12
            }, {
              id: "3",
              nom: "Poivre",
              poids: 300,
              prix: 23
            }, {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 55
            }];

            expect(produitRetourné).toEqual(produitsAttendus);

          });

          it(" prix décroissant", () => {
            //given
            const filter: FiltreProduit = {
              by: FilteredProductFilled.Prix,
              contains: "po",
              order: OrderType.Desc,
            }

            // when
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

            // then
            const produitsAttendus = [{
              id: "2",
              nom: "Poire",
              poids: 100,
              prix: 1
            }, {
              id: "4",
              nom: "Poireau",
              poids: 400,
              prix: 12
            }, {
              id: "3",
              nom: "Poivre",
              poids: 300,
              prix: 23
            }, {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 55
            }].reverse();

            expect(produitRetourné).toEqual(produitsAttendus);

          });

          it(" de poids croissant", () => {
            //Given
            const filter: FiltreProduit = {
              by: FilteredProductFilled.Poids,
              contains: "po",
              order: OrderType.Asc,
            }
            //When
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

            //Then
            const produitsAttendus = [{
              id: "2",
              nom: "Poire",
              poids: 100,
              prix: 1
            }, {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 55
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
            }];

            expect(produitRetourné).toEqual(produitsAttendus);

          });

          it(" de poids décroissant", () => {
            //Given
            const filter: FiltreProduit = {
              by: FilteredProductFilled.Poids,
              contains: "po",
              order: OrderType.Desc,
            }

            //When
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

            //Then
            const produitsAttendus = [{
              id: "2",
              nom: "Poire",
              poids: 100,
              prix: 1
            }, {
              id: "1",
              nom: "Pomme",
              poids: 200,
              prix: 55
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
            }].reverse();

            expect(produitRetourné).toEqual(produitsAttendus);

          });
        });
      })

      describe(" limité ", () => {
        it(" à 2 produits ", () => {
          //given
          const filter: FiltreProduit = {
            by: FilteredProductFilled.Name,
            order: OrderType.Asc,
            limit: 2,
          }

          // when
          const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter(filter);

          // then
          const produitsAttendus = [{
            id: "5",
            nom: "Patate",
            poids: 300,
            prix: 1.5
          }, {
            id: "2",
            nom: "Poire",
            poids: 100,
            prix: 1
          }];

          expect(produitRetourné).toEqual(produitsAttendus);
        });
      });
    });
  });
});
