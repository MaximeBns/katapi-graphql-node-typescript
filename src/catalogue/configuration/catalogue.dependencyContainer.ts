import RecupererLeProduit from "../usecases/recupererLeProduit";
import RecupererLesProduits from "../usecases/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import ProduitAdapter from "../infrastructure/adapter/ProduitAdapter";


export type CatalogueDependencyContainer = {
	recupererLeProduit: RecupererLeProduit,
	recupererLesProduits: RecupererLesProduits,
	creerUnProduit: CreerUnProduit,
};

export default function CreateCatalogueDependencyContainer(): CatalogueDependencyContainer {
	const produitAdapter = new ProduitAdapter()
	const recupererLeProduitUseCase = new RecupererLeProduit(produitAdapter)
	const recupererLesProduitsUseCase = new RecupererLesProduits(produitAdapter)
	const creerUnProduit = new CreerUnProduit(produitAdapter)
	return {
		recupererLeProduit: recupererLeProduitUseCase,
		recupererLesProduits: recupererLesProduitsUseCase,
		creerUnProduit: creerUnProduit,
	}
}
