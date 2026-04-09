import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
const { Client } = require('pg') as { Client: new (config: Record<string, unknown>) => any };

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export function getConnectionConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
    };
  }

  return {
    host: process.env.DB_HOST || process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DB_PORT || process.env.DATABASE_PORT || 5432),
    user:
      process.env.DB_USERNAME ||
      process.env.DB_USER ||
      process.env.DATABASE_USER ||
      process.env.POSTGRES_USER ||
      'postgres',
    password:
      process.env.DB_PASSWORD ||
      process.env.DB_PASS ||
      process.env.DATABASE_PASSWORD ||
      process.env.POSTGRES_PASSWORD ||
      '',
    database:
      process.env.DB_NAME ||
      process.env.DATABASE_NAME ||
      process.env.POSTGRES_DB ||
      'postgres',
  };
}

export async function bootstrapDatabase(shouldReset = false) {
  const candidatePaths = [
    path.resolve(process.cwd(), '..', 'database', 'schema.sql'),
    path.resolve(process.cwd(), 'database', 'schema.sql'),
    path.resolve(__dirname, '..', '..', '..', 'database', 'schema.sql'),
  ];
  const sqlPath = candidatePaths.find((candidate) => fs.existsSync(candidate));

  if (!sqlPath) {
    throw new Error(
      `Unable to locate schema.sql. Checked: ${candidatePaths.join(', ')}`,
    );
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');
  const client = new Client(getConnectionConfig());

  await client.connect();

  try {
    await client.query('BEGIN');

    if (shouldReset) {
      await client.query('DROP SCHEMA IF EXISTS public CASCADE;');
      await client.query('CREATE SCHEMA public;');
    }

    await client.query(sql);
    await client.query('COMMIT');
    console.log(`Database schema bootstrapped from ${sqlPath}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database bootstrap failed:', error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

async function run() {
  await bootstrapDatabase(process.argv.includes('--reset'));
}

if (require.main === module) {
  void run();
}
