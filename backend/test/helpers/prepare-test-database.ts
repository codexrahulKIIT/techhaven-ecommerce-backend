import '../bootstrap-env';
import { bootstrapDatabase } from '../../src/scripts/bootstrap-db';
import { runSeed } from '../../src/seeds/seed';

let prepared = false;

export async function prepareTestDatabase(force = false) {
  if (prepared && !force) {
    return;
  }

  await bootstrapDatabase(true);
  await runSeed();
  prepared = true;
}
