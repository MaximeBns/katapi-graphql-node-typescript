import RecupererLeProduit from "../usecases/recupererLeProduit";
import RecupererLesProduits from "../usecases/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import {Connection} from "typeorm";
import ProduitAdapter from "../infrastructure/adapter/ProduitAdapter";


export type CatalogueDependencyContainer = {
	recupererLeProduit: RecupererLeProduit,
	recupererLesProduits: RecupererLesProduits,
	creerUnProduit: CreerUnProduit,
};

export default function CreateCatalogueDependencyContainer(connection: Connection): CatalogueDependencyContainer {
	const produitAdapter = new ProduitAdapter(connection)
	const recupererLeProduitUseCase = new RecupererLeProduit(produitAdapter)
	const recupererLesProduitsUseCase = new RecupererLesProduits(produitAdapter)
	const creerUnProduit = new CreerUnProduit(produitAdapter)
	return {
		recupererLeProduit: recupererLeProduitUseCase,
		recupererLesProduits: recupererLesProduitsUseCase,
		creerUnProduit: creerUnProduit,
	}
}
