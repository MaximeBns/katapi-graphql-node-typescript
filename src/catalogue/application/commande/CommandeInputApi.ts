export type CommandeInputApi = Readonly<{
    elements: ElementCommandeInputApi[]
}>

export type ElementCommandeInputApi = Readonly<{
    idProduit: string;
    quantite: number;
}>