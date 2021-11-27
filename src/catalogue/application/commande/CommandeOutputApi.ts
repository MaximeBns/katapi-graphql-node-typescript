import ProduitOutputApi from "../produit/ProduitOutputApi";

export type ElementCommandeOutputApi = Readonly<{
    produit : ProduitOutputApi;
    quantite: number;
}>

export type CommandeOutputApi = Readonly<{
    __typename: string;
    id: string;
    statut: string;
    elements: ElementCommandeOutputApi[];
    poids: number;
    fraisDePort: number;
    montantTotal: number;
}>