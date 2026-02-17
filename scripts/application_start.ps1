Set-Location -Path "C:\Users\Administrator\mod_photograph_node"
pm2 delete my-node-app
pm2 start index.js --name "my-node-app"
pm2 save
