Write-Host "Preparing and running TechHaven E2E tests..." -ForegroundColor Green

Set-Location $PSScriptRoot

Write-Host "Running Playwright suite..." -ForegroundColor Yellow
npm run test:e2e

if ($LASTEXITCODE -ne 0) {
    Write-Host "Playwright tests failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

if (Test-Path "playwright-report/index.html") {
    Write-Host "Opening Playwright HTML report..." -ForegroundColor Cyan
    Start-Process "playwright-report/index.html"
}

Write-Host "E2E tests completed." -ForegroundColor Green
