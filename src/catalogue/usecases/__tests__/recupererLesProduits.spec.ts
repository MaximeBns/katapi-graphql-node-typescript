import Produit from "../../domain/entities/produit";
import CreerUnProduit from "../creerUnProduit";
import produitPortTest from "./helper/PortsTests";
import RecupererLesProduits from "../recupererLesProduits";
import ProduitAdapter from "../../infrastructure/adapter/ProduitAdapter";

describe('recupererLesProduits', () => {
    describe('exécuter : quand on récupère les produits', () => {
        it('alors retourne les produits', () => {
            // given
            const produitPort = produitPortTest;
            const produitSauvegardés: Array<Produit> = [{
                id: "",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }];
            produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)

            // when
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter();

            // then
            const produitsAttendus = [{
                id: "",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }];
            expect(produitRetourné).toEqual(produitsAttendus);
        });

        it('alors retourne les produits filtrés s\'il y a un filtre', () => {
            // given
            const produitPort = produitPortTest;
            const produitSauvegardés: Array<Produit> = [{
                id: "1",
                nom: "Pomme",
                poids: 200,
                prix: 1
            },
            {
                id: "2",
                nom: "Poire",
                poids: 300,
                prix: 1.5
            }
            ];
            produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)

            // when
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter("Pom");

            // then
            const produitsAttendus = [{
                id: "1",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }];
            expect(produitRetourné).toEqual(produitsAttendus);
        });

        it('alors retourne les produits filtrés s\'il y a un filtre qui n\'a pas la même casse', () => {
            // given
            const produitPort = produitPortTest;
            const produitSauvegardés: Array<Produit> = [{
                id: "1",
                nom: "Pomme",
                poids: 200,
                prix: 1
            },
                {
                    id: "2",
                    nom: "Poire",
                    poids: 300,
                    prix: 1.5
                }
            ];
            produitPort.récupérerLesProduits = jest.fn().mockReturnValue(produitSauvegardés)

            // when
            const produitRetourné = new RecupererLesProduits(produitPort as ProduitAdapter).exécuter("pom");

            // then
            const produitsAttendus = [{
                id: "1",
                nom: "Pomme",
                poids: 200,
                prix: 1
            }];
            expect(produitRetourné).toEqual(produitsAttendus);
        });
    });
});
