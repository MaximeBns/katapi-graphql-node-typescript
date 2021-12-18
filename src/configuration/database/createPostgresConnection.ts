import {Connection, createConnection} from "typeorm";
import ElementCommandeTypeORMEntity
	from "../../catalogue/configuration/db/type-orm-entity/elementCommandeTypeORMEntity";
import CommandeTypeORMEntity from "../../catalogue/configuration/db/type-orm-entity/commandeTypeORMEntity";
import ProduitTypeORMEntity from "../../catalogue/configuration/db/type-orm-entity/produitTypeORMEntity";

export async function createPostgresConnection(): Promise<Connection> {
	const createdConnection = await createConnection({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "username",
		password: "password",
		database: "default_database",
		entities: [
			ProduitTypeORMEntity,
			CommandeTypeORMEntity,
			ElementCommandeTypeORMEntity,
		],
		synchronize: true,
	});
	return createdConnection
}
