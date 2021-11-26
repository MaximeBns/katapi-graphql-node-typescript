import Produit from "../produit";
jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

describe('produit', () => {
    describe('creer : quand on créé un produit', () => {
        it('alors retourne un objet Produit', () => {
            // given
            const produitAttendu: Partial<Produit> = {
              id:"1",
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
