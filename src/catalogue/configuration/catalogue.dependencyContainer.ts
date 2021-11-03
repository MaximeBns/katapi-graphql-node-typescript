import RecupererLeProduit from "../usecases/recupererLeProduit";
import RecupererLesProduits from "../usecases/recupererLesProduits";
import CreerUnProduit from "../usecases/creerUnProduit";
import ProduitPort from "../domain/ports/produitPort";


export type CatalogueDependencyContainer = {
  recupererLeProduit: RecupererLeProduit,
  recupererLesProduits: RecupererLesProduits,
  creerUnProduit: CreerUnProduit,
};

export default function createCatalogueDependencyContainer(produitPort: ProduitPort): CatalogueDependencyContainer {
  const recupererLeProduitUseCase = new RecupererLeProduit(produitPort)
  const recupererLesProduitsUseCase = new RecupererLesProduits(produitPort)
  const creerUnProduit = new CreerUnProduit(produitPort)
  return {
    recupererLeProduit: recupererLeProduitUseCase,
    recupererLesProduits: recupererLesProduitsUseCase,
    creerUnProduit: creerUnProduit,
  }
}
