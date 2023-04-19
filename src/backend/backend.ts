import { Client, Pool } from "pg"
import { PASSWORD } from "./password" //Create a file called "password.ts" within this folder contaning a the following line: export const PASSWORD: string = "[your_password]"

const DATABASE_NAME = "catalogo"
const TABLE_NAME = "productos"

const EXISTS_DATABASE_QUERY = `SELECT 'CREATE DATABASE ${DATABASE_NAME}' WHERE EXISTS (SELECT datname FROM pg_database WHERE datname = '${DATABASE_NAME}');`
const CREATE_DATABASE_QUERY = `CREATE DATABASE ${DATABASE_NAME}`
const CREATE_TABLE_CATALOGO = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id serial,
    iso VARCHAR(100),
    name VARCHAR(100),
    price_eur int,
    available BOOLEAN,
    product_id int,
    ean int,
    ansi VARCHAR(100)
);`

const CONNECTION_DATA = {
    user: "postgres",
    host: "localhost",
    database: DATABASE_NAME,
    password: PASSWORD,
    port: 5432
}

const CONNECTION_DATA_W_DB = {
    ... CONNECTION_DATA,
    database: DATABASE_NAME
}

//CONNECT AND CREATE DATABASE AND TABLE (if they don't exist already)
export const connectDb = async () => {
    try {
        const client = new Client(CONNECTION_DATA)

        await client.connect()
        const existsDatabase = await client.query(EXISTS_DATABASE_QUERY)

        if(existsDatabase.rows.length == 0) {
            await client.query(CREATE_DATABASE_QUERY)
        }
        await client.end()

        const client2 = new Client(CONNECTION_DATA_W_DB)
        await client2.connect()
        await client2.query(CREATE_TABLE_CATALOGO)
        await client2.end()

    } catch (error) {
        console.log(error)
    }
}

//SELECT
export async function getInfoFromDatabase() {
    const query = `SELECT * FROM public.${TABLE_NAME}`
    
    const pool = new Pool(CONNECTION_DATA)
    pool.query(query, (err, res) => {
        err ? console.error(err) : console.log(res.rows)
        pool.end()
    })
}

//INSERT
export async function addInfoToDatabase(
    iso: string, 
    name: string, 
    price_eur: number, 
    available: boolean, 
    product_id: number, 
    ean: number, 
    ansi: string
){
    const query = `INSERT INTO public.${TABLE_NAME}(iso, name, price_eur, available, product_id, ean, ansi)` +  
                  `VALUES('${iso}', '${name}', ${price_eur}, ${available}, ${product_id}, ${ean}, '${ansi}')`
    
    const pool = new Pool(CONNECTION_DATA)
    await pool.query(query, async(err, res) => {
        if(err) {
            console.error(err)
        }
    })
    await pool.end()
}