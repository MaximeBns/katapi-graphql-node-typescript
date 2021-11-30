## Pagination 


**Pourquoi faire de la pagination ?**

Contexte : j'ai une base de donnés de plus de 20 millions d'utilisateurs je souhaite récupérer tous les utilisateurs
dont le nom commence par "po". Avec une base de données aussi volumineuse il peut y plus d'une centaine d'utilisateur
qui matchent cette condition. Il est alors intéressant de pouvoir récupérer une partie de cette liste d'utilisateur, 
  pour des raisons de performance (et aussi UX).

**Comment faire de la pagination en graphql ?**

C'est pareil qu'en REST ? 

1. Pagination et Edges

La pagination peut être réalisé de différentes façons :

1.1 start ou offset et limit 

On peut utiliser un offset et une limite pour récupérer une partie de nos éléments.

exemple :

````ts

query {
    users(offset: 10 limit: 10) {
            id
            name
            age
        }
}
````

Cette query nous permet de récupérer 10 utilisateurs à partir du 11e utilisateur de notre liste. La pagination à l'aide 
d'un offset et simple et rapide à implémenter. 

Est-ce une bonne méthode et est-ce performant ? 

C'est une methode simple à implémenter comme on l'a dit plus haut. Surtout, si la base de donnée que vous utilisez
possède un mot clef pour l'offset. Par exemple avec postgresql, le mot clef "offset" permet de préciser l'offset
à partir duquel on commence notre recherche d'éléments. Il suffit de préciser la limit et le tour et joué, vous pouvez
faire de la pagination.

```postgresql
SELECT *
  FROM users
 ORDER BY created_date DESC
OFFSET 10
 FETCH NEXT 10 ROWS ONLY
```

Maintenant que se passe t-il avec nos 20 millions d'utilisateurs si je donne un offset égale à 40000 ? 

Je souhaite récupérer 10 utilisateurs en partant de l'offset 40 000. Notre moteur de base de données est obligé de 
compter du premier jusqu'au 40 000e utilisateur afin de nous retourner nos 10 utilisateurs.

Que se passe-t il, si j'ajoute un utilisateur entre temps dans ma base de donnée ? 

En sachant que mes utilisateurs sont retournés par ordre décroissant de date d'ajout. Si j'ajoute un nouvel utilisateur
ou plusieurs entre temps. Ma page sera décalé vers le bas. Ansi je ne récupérerai potentiellement pas les mêmes
utilisateurs au moment ou je ferai ma requête.

Pros : 

- simple et rapide à implémenter
- pour une petite base de données d'utilisateur

Cons:

- la page change lorsque l'on ajoute de nouveaux éléments dans notre base
- le temps de réponse augmente lorsque vous augmenter la valeur de l'offset


1.2 pagination avec un curseur 

"Cursor-based pagination is the most efficient method of paging and should always be used where possible."
"La pagination basée sur le curseur est la méthode de pagination la plus efficace et doit toujours être 
 utilisée dans la mesure du possible."
- Facebook

Ce type de pagination utilise un champ ou un pointeur vers un champ de nos données pour
 paginer les résultats.

exemple : 

````
query {
    users(limit: 10, cursor: '21-12-2021'){
        name
        age
    }
}

````

Ici nous utilisons la date comme curseur cela nous permet de récupérer les 10 utilisateurs créer après la date spécifier.
Même si on ajoute de nouveau utilisateurs, on récupéra toujours les même 10 utilisateurs (sauf si bien sur une suppression est faite).

À noter : votre curseur doit être un champ dont la données est unique. Par exemple l'id est unique ou la date de création.


````
SELECT *
  FROM users
 WHERE create_at < ?
 ORDER BY create_at DESC
 FETCH FIRST 10 ROWS ONLY
````

L'utilisation du curseur à un gros impacte positif sur les performances, la date peut être utilisée comme index pour sauter
directement à l'élément pointer puis le moteur de base de donnée peut retourner les 10 éléments suivants.

Important : La pagination nécessite un ordre de tri déterministe.


1.3 Edge et Connection 

La connexion est un concept qui a commencé avec RelayJS et est utilisé pour GraphQL. Ce concept est utilisé par Facebook,
Twitter et GitHub pour récupérer les enregistrements paginés.

La connexion est un objet qui contient des edges et des nodes.

**Connection** : cet objet contient des métadonnées sur le champ paginé. Ceci est principalement utilisé dans la pagination 
basée sur le curseur car cela nous donne des informations supplémentaires que nous utilisons pour effectuer la requête 
suivante.

**Edge** : cet objet contient les informations sur le parent et l'enfant qu'il contient. Il relie deux nodes (ou noeuds)
, représentant une sorte de relation entre les deux nœuds. Chaque bord contient des métadonnées sur chaque objet dans le résultat 
paginé renvoyé.

**Nodes** : les objets présents dans les edges (bords).

````graphql
type Users {

    id: String!

    name: String

    age: String

}

type Edge {

    node: NewsItem

    cursor: String

}

type PageInfo {

    startCursor: String

    hasNextPage: Boolean

}

type UsersResult {

    totalCount: String

    edges: [ProduitEdge]

    pageInfo: PageInfo

}

type Query {

    news(first: Int, afterCursor: String): UsersResult

}
````


- Le totalCount : sera le nombre total d'éléments dans la base de données. Cette information est utile si nous voulons 
afficher le nombre d'utilisateurs dans notre base de données.

- L'objet edge comme nous le savons déjà contient des informations sur chaque node, ici il contient le curseur de chaque 
node. Le node correspond à un utilisateur et son curseur.

- La pageInfo contient des informations générales sur la page 
particulière renvoyée. 
  
- Ici le startCursor contient le prochain curseur qui sera utilisé pour récupérer le prochain élément d'actualité défini.
  hasNextPage est un booléen qui nous dit s'il y a plus d'actualités ou non. Ouvrir dans Google Traduction
•
Commentaires

Google Traductionhttps://translate.google.fr › ...
Ce service gratuit de Google traduit instantanément des mots, des expressions et des pages Web du français vers plus de 100 autres langues.



Connection : le fait de retourner le curseur suivant qui peut être utilisé pour récupérer les éléments suivant 
de la liste  

Connection is a concept that started with RelayJS and is used for GraphQL. 
This concept is used by Facebook, Twitter, and GitHub for fetching the paginated records.



### Sources 

[pagination graphql](https://use-the-index-luke.com/sql/partial-results/fetch-next-page)
[pagination in graphql dev.to](https://daily.dev/blog/pagination-in-graphql)
