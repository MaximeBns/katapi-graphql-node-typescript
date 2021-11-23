export default class Produit {
    static readonly TAILLE_NOM_MINIMUM = 3;

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

    static creer(nom: string, prix: number, poids: number): Produit {
        if (nom.length < Produit.TAILLE_NOM_MINIMUM) throw new Error("Le nom du produit est trop court");
      const randomId = Math.round(Math.random() *10).toString();

      return new Produit(randomId, nom, prix, poids)
    }
}
