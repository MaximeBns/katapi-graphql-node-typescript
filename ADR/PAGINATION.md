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

Connection : le fait de retourner le curseur suivant qui peut être utilisé pour récupérer les éléments suivant 
de la liste  

Connection is a concept that started with RelayJS and is used for GraphQL. 
This concept is used by Facebook, Twitter, and GitHub for fetching the paginated records.