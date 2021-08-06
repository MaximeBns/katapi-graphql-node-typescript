
describe('produits', ()=>{

    describe('creer', ()=>{
        it('default', ()=>{
            // given
            const produitAttendu : Produit = {
                id: "",
                nom: "Pastèque",
                prix: 20,
                poids: 5,
            }
            //when
            const produitCréé = Produit.creer("Pastèque", 20, 5)
            //then
            expect(produitCréé).toEqual(produitAttendu)
        })
    })
})
