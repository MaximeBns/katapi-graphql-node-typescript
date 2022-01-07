import {createPostgresConnection} from "../../../../configuration/database/createPostgresConnection";
import DatabaseProduitAdapter from "../DatabaseProduitAdapter";
import Produit from "../../../domain/entities/produit";
import ProduitTypeORMEntity from "../../../configuration/db/type-orm-entity/produitTypeORMEntity";
import TypeORMClient from "../../../../configuration/database/TypeORMClient";
import {FilteredProductFilled, FiltreProduit, OrderType} from "../../../usecases/recupererLesProduits/filtreProduit";

describe('DatabaseProduitAdapter',  () => {
    const typeORMClient = new TypeORMClient(createPostgresConnection())
    const adapter = new DatabaseProduitAdapter(typeORMClient)

    afterEach(async () => {
        await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).delete({}))
    })

    describe('quand sauvegarderProduit est appelée', () => {
        it("sauvegarde le produit en base", async () => {
            // given
            const pasteque: Produit = {
                id: "pastequeId",
                nom: "Pastèque",
                prix: 22,
                poids: 5,
            }

            // when
            await adapter.sauvegarderProduit(pasteque)

            // then
            const pastequeEnBase = await typeORMClient.executeQuery<ProduitTypeORMEntity>(connection => connection.getRepository(ProduitTypeORMEntity).findOne({id: "pastequeId"}))
            expect(pastequeEnBase).toEqual(pasteque)
        });
    })

    describe('quand récupérerLeProduit est appelée', () => {
        it('renvoie le produit s\'il existe', async () => {
            // Given
            const pomme_db = new ProduitTypeORMEntity('idPomme','Pomme',20,1)
            await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save(pomme_db))

            // When
            const pomme_récupérée = await adapter.récupérerLeProduit('idPomme')

            // Then
            const expected_pomme = Produit.creer('idPomme','Pomme',20,1)
            expect(pomme_récupérée).toEqual(expected_pomme)
        })
    })

    describe('quand récupérerLesProduits est appelée', () => {
        let produits: Produit[]

        beforeEach(async () => {
            produits = [{
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
            await typeORMClient.executeQuery(connection => connection.getRepository(ProduitTypeORMEntity).save(produits.map(p => ProduitTypeORMEntity.fromProduit(p))))
        })

        it('renvoie la liste des produits en base s\'il n\'y a pas de filtre', async () => {
            // When
            const produits_récupérés = await adapter.récupérerLesProduits()

            // Then
            expect(produits_récupérés).toEqual(produits)
        })

        describe("filtré", ()=>{
            describe('contenant le pattern \'po\' ', ()=>{
                describe("par ordre", ()=>{
                    describe("croissant de", ()=>{
                        describe("nom", ()=>{
                            it("alors retourne une liste de produits triés par nom croissant", async () => {
                                //given
                                const filtre: FiltreProduit = {
                                    by: FilteredProductFilled.Name,
                                    order: OrderType.Asc,
                                    contains: "po",
                                }

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

                                // when
                                const produitRetourné = await adapter.récupérerLesProduits(filtre)

                                // then
                                expect(produitRetourné).toEqual(produitsAttendus);
                            })
                        })
                        describe("prix", ()=>{
                            it("alors retourne une liste de produit trié par ordre de prix", async () => {
                                const filtre: FiltreProduit = {
                                    by: FilteredProductFilled.Prix,
                                    contains: "po",
                                    order: OrderType.Asc,
                                }
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

                                //When
                                const produitRetourné = await adapter.récupérerLesProduits(filtre)

                                //Then
                                expect(produitRetourné).toEqual(produitsAttendus);

                            })
                        })
                        describe("poids", ()=>{
                            it("alors retourne une liste de produit trié par ordre de poids croissant", async () => {
                                //Given
                                const filtre: FiltreProduit = {
                                    by: FilteredProductFilled.Poids,
                                    contains: "po",
                                    order: OrderType.Asc,
                                }
                                //When
                                const produitRetourné = await adapter.récupérerLesProduits(filtre)

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

                            })
                        })
                    })

                    describe("décroissant de", ()=>{
                        describe("nom", ()=>{
                            it("alors retourne une liste de produit trié par nom décroissant", async () => {
                                //given
                                const filtre: FiltreProduit = {
                                    by: FilteredProductFilled.Name,
                                    order: OrderType.Desc,
                                    contains: "po",
                                }

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

                                // when
                                const produitRetourné = await adapter.récupérerLesProduits(filtre)

                                // then
                                expect(produitRetourné).toEqual(produitsAttendus);
                            })
                        })

                        describe("prix", ()=>{
                            it("alors retourne une liste de produit trié par ordre de prix décroissant", async () => {
                                //Given
                                const filtre: FiltreProduit = {
                                    by: FilteredProductFilled.Prix,
                                    contains: "po",
                                    order: OrderType.Desc,
                                }

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


                                //When
                                const produitRetourné = await adapter.récupérerLesProduits(filtre)

                                //Then
                                expect(produitRetourné).toEqual(produitsAttendus);
                            })
                        })

                        describe("poids", ()=>{
                            it("alors retourne une liste de produit trié par ordre de poids décroissant", async () => {
                                //Given
                                const filtre: FiltreProduit = {
                                    by: FilteredProductFilled.Poids,
                                    contains: "po",
                                    order: OrderType.Desc,
                                }

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

                                //When
                                const produitRetourné = await adapter.récupérerLesProduits(filtre)

                                //Then

                                expect(produitRetourné).toEqual(produitsAttendus);

                            })
                        })
                    })
                })
            })
        })

        describe("limité", ()=>{
            it(" à 2 produits alors retourne 2 produits ", async () => {
                //given
                const filter: FiltreProduit = {
                    by: FilteredProductFilled.Name,
                    order: OrderType.Asc,
                    limit: 2,
                }

                // when
                const produitRetourné = await adapter.récupérerLesProduits(filter)

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
        })
    })

    afterAll(async () => {
        await typeORMClient.closeConnection()
    })
})