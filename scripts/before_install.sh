#!/bin/bash

# Update the system
sudo apt-get update

# Install Node.js and NPM if they are not already installed
if ! [ -x "$(command -v node)" ]; then
  curl -sL https://deb.nodesource.com | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# Install PM2 globally to manage the Node process
sudo npm install pm2@latest -g

# Clean the directory where we will deploy the app
export APP_DIR="/home/ubuntu/mod_photograph_node"
if [ -d "$APP_DIR" ]; then
    rm -rf "$APP_DIR"
fi
mkdir -p "$APP_DIR"
