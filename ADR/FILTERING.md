### A Explorer

*  Qu'est ce que parent dans les parametres du resolver ? 

* Ecrire un petit article sur info 

* args 


* Fragments
    * Inline fragments
* Aliases
* Arguments
* Variables
* Meta fields

Voir pour ces sujets => [graphql queries](https://graphql.org/learn/queries/)

### Sommaire

1. Langage de definition de schéma ou LSD & type GraphQL
2. Concepts de base
3. Le filtrage
4. Glossaire

## Introduction

Ici nous parleront du system de type de graphql et de comment il permet de définir quelles données peuvent être
récupérées d'une API.

Il est possible d'utiliser GraphQL avec tous les langages de programmation. Pour cela il faut qu'un moteur graphql est été
implémenté pour ce langage. 

À savoir :

* Graphql est agnostic du langage de programmation, c'est un concept qui peut être implémenté en suivant les
  specifications officiels.

* Les outils, package développé pour GraphQL sont plus nombreux et robuste pour le langage JavaScript. Ainsi la majorité
  des exemples et commentaire seront principalement fait en typescript. Mais la logique et la syntaxe des query et
  mutation reste la même quelques soit les langages de programmations.

## LSD

GraphQL possède son propre système de type. Grace à son langage de définition de schema
(Schema Definition Language ou SDL) on peut définir un ensemble de types. C'est ce que l'on appelle le schema graphql. Ce
schema constitue un contrat entre le client et le serveur. Cela permet de savoir "ce qu'une API peut faire" => qu'elles
données on peut récupérer. Une fois ce contrat défini, les développeurs front on la possibilités de définir les "query" 
et mutations spécifiques à leur besoins.

### Type Primitive GraphQL

Il existe 5 types Built-In en GraphQL: Int, Float, String, Boolean and ID. Le Type ID est une string, mais attend une 
valeur unique.

```graphql
#ici nous définissons un type utilisateur à l'aide du LSD

type Utilisateur {
    id: ID!
    nom: String!
    prenom: String!
    age: Int!
    sex: String!
    poids: Float!
    disponible: Boolean!
}
```

### Type Modifiers

* le ! permet de préciser que le paramètre est obligatoire et non null
* sans le signe ! après un type, cela signifie l'attribut peut être null

- type : la valeur du type string peut être null
- type! : la valeur ne peut être null
- [type] : tableau de valeur de type string pouvant être null, avec des valeurs pouvant être null 
- [type!] : tableau de valeur de type string pouvant être null, avec des valeurs ne pouvant être null
- [type!]! : tableau de valeur de type string pouvant ne pouvant être null, avec des valeurs ne pouvant être null

ici type représente un type primitif ou un type custom.

### Enumeration

Le type énumération permet de définir un sous-ensemble spécifique de valeurs possibles pour un type.

````graphql

enum Dimension {
    PETIT
    MOYEN
    LARGE
}

type Colis {
    dimension: Dimension!
}

````

Ici le type Dimension ne peut prendre que les valeurs PETIT, MOYEN ou LARGE (valeur de type string la casse doit être respecté). Une autre valeur entrainerai une erreur de
validation du schema GraphQL.

Le client doit envoyer une valeur du string correspondant à la valeur de l'enum. Exemple "PETIT".

### Union

Le type union permet de créer un type qui peut être résolue en différents autre types.

````graphql
union Vehicule = Voiture | Bateau | Avion

type Query {
    getVehicule(id: ID!): Vehicule!
}
````

Ici on crée le type véhicule, en précisant que celui-ci peut être soit une voiture, un bateau ou un avion.

il est par la suite possible d'utiliser les fragments inline pour sélectionner les attributs que l'on souhaite en
fonction de si il s'agit d'un Bateau ou un Avion

`````graphql
query {
    getVehicule {
        ...on Voiture {
            nombreDeCheveau
        }
        ...on Bateau {
            nombreMoteur
        }
        ...on Avion {
            nombreDeTurbine
        }
    }
}
`````

### Interfaces

Les interface sont pratique pour permettre à plusieurs types de partager les mêmes attributs.

`````graphql
interface Vehicule {
    couleur: String
    kilometrage: String
    vitesse: Int
}

type Voiture implements Vehicule {
    couleur: String
    kilometrage: String
    vitesse: Int
    model: String
}
`````

Chaque type qui implémente une interface doit avoir des champs correspondant à tous les champs de l'interface, mais peut
également avoir des champs supplémentaires qui lui sont propres

### Input Types

Lorsque l'on crée une mutation ou une query, si elle prend plusieurs paramètres il est pratique de créer un type input.

````graphql
input NouvelleVoitureInput {
    couleur: String!
    kilometrage: Int!
    portes: Int!
    vitesse: Int
}

type Mutation {
    addVoiture(nouvelleVoiture: NouvelleVoitureInput!): ID!
    supprimerVoiture(id: ID!): ID!
}
````

### Documentation d'un schema

````graphql
"""
Input type utiliser pour ajouter une nouvelle voiture
"""
input NouvelleVoitureInput {
    couleur: String!
    kilometrage: Int!
    portes: Int!
    vitesse: Int
}

type Mutation {
    addVoiture(nouvelleVoiture: NouvelleVoitureInput!): ID!
    supprimerVoiture(id: ID!): ID!
}
````

## Concepts de base

En REST chaque enpoint à une structure et permet de récupérer un schema specifique de données fixe
(il est vrai que l'on peut utiliser des filtres pour supprimer des données, mais on ne peut en ajouter).

En graphql il n'existe qu'un seul enpoint permettant de récupérer la données. Cela est possible car le client qui fait
une requête fourni un schema précis des données qu'il veut récuperer.

### Query

Les query permette en graphql de récupérer la données à l'aide d'un schema.

`````graphql
{
    touteLesVoitures {
        nom
    }

}
`````

A savoir :

* ***touteLesVoitures*** : est appelé la "root field " = attribut racine
* les attributs entre les accolades sont appelé sont la payload.

### Mutation

Une mutation permet :

* D'ajouter de la données
* De supprimer de la données
* De modifier de la données

Subscription:

Une souscription est un flux de données envoyé au client. Il est possible à l'aide du concept de souscription de
s'abonner à un événement. Lorque celui ci se produit, la données au quelle il est rattaché est envoyé au client.

`````graphql
subscription {
    nouvelleVoiture {
        nom
        vitesse
    }
}
`````

1. on envoie cette requête au serveur
2. a chaque fois qu'une mutation créera une voiture, alors le nom et la vitesse de la voiture seront renvoyé au client.
   Cela permet de réagir en temps réel.

## Defnir un schema

`````graphql
type Query {

}
type Mutation {

}
type Subscription {

}
`````

Ces trois types sont les points d'entrée des requêtes envoyées par le client.

### schema complet

`````graphql
type Query {
    toutesLesVoitures(last: Int): [Voitures!]!
}

type Mutation {
    creerVoiture(nouvelleVoiture: NouvelleVoitureInput): Voiture!
    mettreAJourVoiture(marque: String!, age: Int): Voiture!
    supprimmerVoiture(id: ID!): ID!
}

type Subscription {
    creerVoiture: Voiture!
}

type Voiture {
    id: ID!
    marque: String!
    age: Int!
}

input NouvelleVoitureInput{
    marque: String!
    age: Int!
}

`````


## Resolvers Graphql 

Qu'est ce qu'un résolver ? 

Une fois notre schéma designés, il nous faut quelque chose capable de récupérer les données à partir de la source de données
lorsque l'on demande un champ en particulier. 

Un résolveur est une fonction chargée de renseigner les données d'un seul champ de votre schéma. 
Chaque fois qu'un client interroge un champ particulier, le résolveur de ce champ récupère les données demandées à 
partir de la source de données appropriée.

A quoi ressemble un résolveur ? 

Voici la signature d'un résolveur : 

nomDuResolveur(parent, args, context, info) => data 

- parent : contient la valeur du résolveur parent dans du champ retourné par ce résolveur, si celui-ci existe.
  (le résolveur d'un champ parent s'exécute toujours avant les résolveurs des enfants de ce champ).
  
- args: Cet objet contient tous les arguments GraphQL fournis pour ce champ. (ex: paramètres de filtrage ou ID)

- context: Cet objet est partagé entre tous les résolveurs qui s'exécutent pour une opération particulière. Utilisez-le
  pour partager l'état par opération, comme les informations d'authentification et l'accès aux sources de données.

- info: Il contient des informations sur l'opération. (ex: le nom de la requête, les champs que l'on souhaite récupérer).

## Filtering


Le filtrage et la recherche sont des fonctionnalités que l'on implémente souvent dans nos API. Dans cette section 
je vais vous présenter la façon dont sont implémentés le filtrage et la recherche en Graphql.




--------
Ressources :

[How does a graphQL service work internally?](https://medium.com/axel-springer-tech/how-does-a-graphql-service-work-internally-496dc9264096)

[Grapql specs](http://spec.graphql.org/June2018/#)

[SDL References](https://www.digitalocean.com/community/tutorials/graphql-graphql-sdl)

[GraphQL Server Basics: GraphQL Schemas, TypeDefs & Resolvers Explained](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)
