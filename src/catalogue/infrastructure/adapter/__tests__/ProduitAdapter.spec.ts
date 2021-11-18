import Produit from "../../../domain/entities/produit";
import ProduitAdapter from "../ProduitAdapter";
import {FilteredProductFilled, FiltreProduit, OrderType} from "../../../usecases/recupererLesProduits/filtreProduit";

describe("ProduitAdapter", () => {
	describe("sauvegarderProduit quand on sauvegarde un produit", () => {
		it("ajoute le produit recu en paramètres dans un tableau", () => {
			// given
			const produitASauvegarder: Produit = {
				id: "",
				nom: "Pastèque",
				prix: 20,
				poids: 5,
			}
			const produitAdapter = new ProduitAdapter()

			// when
			produitAdapter.sauvegarderProduit(produitASauvegarder)

			// then
			expect(produitAdapter.listeProduit).toContain(produitASauvegarder)
		});
	});
	describe("récupérerLesProduits quand on veut récupérer tous les produits", () => {
		let produitSauvegardés : Array<Produit>
		let produitAdapter : ProduitAdapter

		beforeEach(()=>{
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
			}];
			produitAdapter = new ProduitAdapter()
			produitAdapter.listeProduit = produitSauvegardés
		})

		it("retourne une liste de produits", () => {
			// given
			const produitAdapter = new ProduitAdapter()
			produitAdapter.listeProduit = [{
				id: "",
				nom: "Pastèque",
				prix: 20,
				poids: 5,
			}];

			// when
			const produitsRécupérés = produitAdapter.récupérerLesProduits();

			// then
			const produitAttendu = {
				id: "",
				nom: "Pastèque",
				prix: 20,
				poids: 5,
			};
			expect(produitsRécupérés).toContainEqual(produitAttendu);
		});

		describe("filtré", ()=>{
			describe('contenant le pattern \'po\' ', ()=>{
				describe("par ordre", ()=>{
					describe("croissant de", ()=>{
						describe("nom", ()=>{
							it("alors retourne une liste de produit trié par nom croissant", ()=>{
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
								const produitRetourné = produitAdapter.récupérerLesProduits(filtre)

								// then
								expect(produitRetourné).toEqual(produitsAttendus);
							})
						})
						describe("prix", ()=>{
							it("alors retourne une liste de produit trié par ordre de prix", ()=>{
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
								const produitRetourné = produitAdapter.récupérerLesProduits(filtre)

								//Then
								expect(produitRetourné).toEqual(produitsAttendus);

							})
						})
						describe("poids", ()=>{
							it("alors retourne une liste de produit trié par ordre de poids croissant", ()=>{
								//Given
								const filtre: FiltreProduit = {
									by: FilteredProductFilled.Poids,
									contains: "po",
									order: OrderType.Asc,
								}
								//When
								const produitRetourné = produitAdapter.récupérerLesProduits(filtre)

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
							it("alors retourne une liste de produit trié par nom décroissant", ()=>{
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
								const produitRetourné = produitAdapter.récupérerLesProduits(filtre)

								// then
								expect(produitRetourné).toEqual(produitsAttendus);
							})
						})

						describe("prix", ()=>{
							it("alors retourne une liste de produit trié par ordre de prix décroissant", ()=>{
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
								const produitRetourné = produitAdapter.récupérerLesProduits(filtre)

								//Then
								expect(produitRetourné).toEqual(produitsAttendus);
							})
						})

						describe("poids", ()=>{
							it("alors retourne une liste de produit trié par ordre de poids décroissant", ()=>{
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
								const produitRetourné = produitAdapter.récupérerLesProduits(filtre)

								//Then

								expect(produitRetourné).toEqual(produitsAttendus);

							})
						})
					})
				})
			})
		})

		describe("limité", ()=>{
			it(" à 2 produits alors retourne 2 produits ", () => {
				//given
				const filter: FiltreProduit = {
					by: FilteredProductFilled.Name,
					order: OrderType.Asc,
					limit: 2,
				}

				// when
				const produitRetourné = produitAdapter.récupérerLesProduits(filter)

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

	});


	describe("récupérerLeProduit quand on veut récupérer un produit", () => {
		// given
		const produitAdapter = new ProduitAdapter()
		produitAdapter.listeProduit = [{
			id: "1",
			nom: "Pastèque",
			prix: 20,
			poids: 5,
		}];

		// when
		const produitRécupéré = produitAdapter.récupérerLeProduit("1");

		// then
		const produitAttendu = {
			id: "1",
			nom: "Pastèque",
			prix: 20,
			poids: 5,
		};
		expect(produitRécupéré).toEqual(produitAttendu);
	});
});


/*

 describe(" filtré ", () => {

      describe(" limité ", () => {

      });


* */
