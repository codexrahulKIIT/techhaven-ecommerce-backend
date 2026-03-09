const fs = require('fs')

async function run() {
  const base = process.env.BACKEND_URL || 'http://localhost:3001/api'
  const endpoints = ['/products', '/categories']

  for (const ep of endpoints) {
    const res = await fetch(`${base}${ep}`)
    const text = await res.text()
    console.log(`${ep}: ${res.status}`)
    fs.writeFileSync(`test-api-${ep.replace('/', '')}.txt`, text)
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
