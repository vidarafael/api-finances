import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "api_finances_tcc",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/modules/**/infra/typeorm/entities/*.{ts,js}"],
    migrations: [__dirname + "/shared/infra/typeorm/migrations/*.{ts,js}"],
    subscribers: [],
})
