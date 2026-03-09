const { spawn } = require('child_process')

const child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: false,
})

child.on('exit', code => process.exit(code ?? 0))
