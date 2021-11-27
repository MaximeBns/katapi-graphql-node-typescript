// @ts-nocheck
import { ServerDependencyContainer } from "../serverDependencyContainer";
import { CatalogueDependencyContainer } from "../../catalogue/configuration/catalogue.dependencyContainer";

export function createFakeServerDependenciesContainer(): ServerDependencyContainer {
    const catalogueDependencyContainer: CatalogueDependencyContainer = {
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


