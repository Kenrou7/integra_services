import { Client, Pool } from "pg"
import { PASSWORD } from "./password"

const DATABASE_NAME = "catalogo"
const TABLE = "productos"

const EXISTS_DATABASE_QUERY = `SELECT 'CREATE DATABASE ${DATABASE_NAME}' WHERE EXISTS (SELECT datname FROM pg_database WHERE datname = '${DATABASE_NAME}');`
const CREATE_DATABASE_QUERY = `CREATE DATABASE ${DATABASE_NAME}`
const CREATE_TABLE_CATALOGO = `CREATE TABLE IF NOT EXISTS ${TABLE} (
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
    password: PASSWORD,
    port: 5432
}

const CONNECTION_DATA_W_DB = {
    ... CONNECTION_DATA,
    database: DATABASE_NAME
}

//CONNECT AND CREATE
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

    const CONNECTION_DATA = {
        user: "postgres",
        host: "localhost",
        database: DATABASE_NAME,
        password: PASSWORD,
        port: 5432
    }

    const query = "SELECT * FROM public.valores_btc"
    
    const pool = new Pool(CONNECTION_DATA)
    pool.query(query, (err, res) => {
        err ? console.error(err) : console.log(res.rows)
        pool.end()
    })
}

//INSERT
export async function insert(idbit: string, date: string, coin: string, value: string) {

    const CONNECTION_DATA = {
        user: "postgres",
        host: "localhost",
        database: DATABASE_NAME,
        password: PASSWORD,
        port: 5432
    }

    const query = "INSERT INTO public.valores_btc(idbit, date, coin, value)" +  
                  `VALUES(${idbit}, '${date}', '${coin}', ${value})`
    
    const pool = new Pool(CONNECTION_DATA)
    await pool.query(query, async(err, res) => {
        if(err) {
            console.error(err)
        }
    })
    await pool.end()
}

// export async function getInfoFromDatabase() {
//     const client = new Client(CONNECTION_DATA_W_DB)
//     const queryResult = await client.query(`SELECT * FROM public.${TABLE}`)
//     await client.end()
//     return queryResult
// }

// export async function setPrice(token: string, price: number) {
//     const client = new Client(CONNECTION_DATA_W_DB)
//     const queryResult = await client.query(`INSERT INTO public.${TABLE}(presio_token, presio_value) VALUES('${token}', ${price})`)
//     await client.end()
//     console.log(`Recording prince ${price} for token ${token}`)
// }