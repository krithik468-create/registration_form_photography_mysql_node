# 1. Ensure Node.js is installed using Chocolatey (common Windows package manager)
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    # Install Chocolatey if not present
    Set-ExecutionPolicy Bypass -Scope Process -Force; 
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; 
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org'))
    
    # Install Node.js
    choco install nodejs -y
}

# 2. Install PM2 globally if it's missing
if (!(Get-Command pm2 -ErrorAction SilentlyContinue)) {
    npm install pm2 -g
}

# 3. Clean up the application directory
$appPath = "C:\Users\Administrator\mod_photograph_node"
if (Test-Path $appPath) {
    # Remove existing files to ensure a clean slate
    Remove-Item -Path "$appPath\*" -Recurse -Force -ErrorAction SilentlyContinue
} else {
    New-Item -Path $appPath -ItemType Directory -Force
}
