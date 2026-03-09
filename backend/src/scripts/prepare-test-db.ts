import { bootstrapDatabase } from './bootstrap-db';
import { runSeed } from '../seeds/seed';

async function run() {
  await bootstrapDatabase(true);
  await runSeed();
}

if (require.main === module) {
  void run();
}
