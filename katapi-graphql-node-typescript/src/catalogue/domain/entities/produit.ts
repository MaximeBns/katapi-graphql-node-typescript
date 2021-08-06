class Produit {
    id: string
    nom: string
    prix: number
    poids: number

    private constructor(id: string, nom: string, prix: number, poids: number) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.poids = poids;
    }

    static creer(nom: string, prix: number, poids: number): Produit{
        return new Produit("", nom, prix, poids)
    }

}
