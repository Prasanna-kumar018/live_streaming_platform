import { neon } from "@neondatabase/serverless";
export default async function Db() {
    const sql = neon(process.env.DATABASE_URL ?? "");
    if (!!sql) {
        console.log('Connection Successful')
        return sql
    }
    else
    {
        throw new Error('Connection Failed')
    }
}

