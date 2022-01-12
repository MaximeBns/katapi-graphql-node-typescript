// @ts-nocheck
import { ServerDependencyContainer } from "../serverDependencyContainer";
import { CatalogueDependenciesContainer } from "../../catalogue/configuration/catalogueDependenciesContainer";

export function createFakeServerDependenciesContainer(): ServerDependencyContainer {
    const catalogueDependencyContainer: CatalogueDependenciesContainer = {
        creerUnProduit: {exécuter: jest.fn()},
        recupererLeProduit: {exécuter: jest.fn()},
        recupererLesProduits: {exécuter: jest.fn()},
        creerUneCommande: {exécuter: jest.fn()},
        recupererLaCommande: {exécuter: jest.fn()},
        recupererLesCommandes: {exécuter: jest.fn()},
    }
    return {
        catalogueDependencyContainer: catalogueDependencyContainer,
    }
}


