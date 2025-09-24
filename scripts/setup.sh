#!/bin/bash

# Update package list and install necessary packages
sudo apt-get update
sudo apt-get install -y nodejs npm

# Install PM2 globally
sudo npm install -g pm2

# Install project dependencies
npm install

# Set up environment variables
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Start the application using PM2
pm2 start bin/www --name 'recruitment-webapp'

# Enable PM2 to start on boot
pm2 startup
pm2 save

echo 'Setup complete. The application is running.'