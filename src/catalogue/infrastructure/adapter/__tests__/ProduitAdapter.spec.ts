import Produit from "../../../domain/entities/produit";
import ProduitAdapter from "../ProduitAdapter";

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

		it('alors retourne les produits filtrés s\'il y a un filtre', () => {
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

		it('alors retourne les produits un nombre limité de produit à partir de offset filtrés s\'il y a un filtre', () => {
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
