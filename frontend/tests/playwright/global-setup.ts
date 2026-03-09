import { spawnSync } from 'child_process';
import * as path from 'path';
import type { FullConfig } from '@playwright/test';

export default async function globalSetup(_config: FullConfig) {
  const backendDir = path.resolve(__dirname, '../../../backend');
  const result = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'npm.cmd run test:prepare-db'], {
        cwd: backendDir,
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_ENV: 'test',
        },
      })
    : spawnSync('npm', ['run', 'test:prepare-db'], {
        cwd: backendDir,
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_ENV: 'test',
        },
      });

  if (result.status !== 0) {
    throw new Error('Failed to prepare the test database');
  }
}
