import ProduitModel from "../../catalogue/infrastructure/adapter/models/produit.model";
import {Connection, createConnection} from "typeorm";

export async function createPostgresConnection(): Promise<Connection> {
	const createdConnection = await createConnection({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "password",
		database: "default_database",
		entities: [],
	});
	return createdConnection
}
