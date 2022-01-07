export class ProduitNonTrouve extends Error {
  constructor(id: string) {
    super(`Aucun produit trouvé avec l'id ${id}`);
  }
}
