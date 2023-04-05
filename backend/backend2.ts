import {Client, Pool} from "pg"

export async function select() {

    const CONNECTION_DATA = {
        user: "postgres",
        host: "localhost",
        database: "Valores",
        password: "Q2Rg7k16Hh",
        port: 5432
    }

    const query = "SELECT * FROM public.valores_btc"
    
    const pool = new Pool(CONNECTION_DATA)
    pool.query(query, (err, res) => {
        err ? console.error(err) : console.log(res.rows)
        pool.end()
    })
}

export async function insert(idbit: string, date: string, coin: string, value: string) {

    const CONNECTION_DATA = {
        user: "postgres",
        host: "localhost",
        database: "Valores",
        password: "Q2Rg7k16Hh",
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