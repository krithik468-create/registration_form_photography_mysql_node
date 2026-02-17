#!/bin/bash

# Navigate to the app directory
cd /home/ubuntu/mod_photograph_node

# Stop the app if it's already running (prevents port conflicts)
pm2 delete my-node-app || true

# Start the app
# Replace 'index.js' with your main entry file (e.g., app.js or server.js)
pm2 start index.js --name "my-node-app"

# Save the PM2 list so it restarts on system reboot
pm2 save
