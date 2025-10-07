import { Pool } from 'pg';

const pool = new Pool({
    user: 'koutayoshizawa',
    host: 'localhost',
    database: 'mindch',
    port: 5432
});

export { pool };