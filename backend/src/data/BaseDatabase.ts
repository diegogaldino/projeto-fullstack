import knex from "knex";
import Knex from "knex";

export abstract class BaseDatabase {

    private static connection: Knex | null = null;

    protected tables = {
        users: "Project_users",
        images:"Project_images"
    }

    protected getConnection(): Knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: 'mysql',
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_SCHEMA,
                    port: 3306,
                    multipleStatements: true
                }
              });        
        }
        return BaseDatabase.connection;
    }

    public static async destroyConnection(): Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }
}