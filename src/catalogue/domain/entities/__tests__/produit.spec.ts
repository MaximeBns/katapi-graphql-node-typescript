import Produit from "../produit";

describe('produit', () => {
    describe('creer : quand on créé un produit', () => {
        it('alors retourne un objet Produit', () => {
            // given
            const produitAttendu: Produit = {
                id: "",
                nom: "Pastèque",
                prix: 20,
                poids: 5,
            }

            // when
            const produitCréé = Produit.creer("Pastèque", 20, 5);

            // then
            expect(produitCréé).toEqual(produitAttendu);
        });
    });

    describe('creer : quand on créé un produit avec un nom trop court', () => {
       it('alors throw une exception', () => {
           // given
            const nomTropCourt = 'Le';

           // when then
           expect(() => Produit.creer(nomTropCourt, 20, 5)).toThrow(new Error('Le nom du produit est trop court'));
       });
    });
});
