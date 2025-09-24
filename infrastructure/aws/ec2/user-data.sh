#!/bin/bash

# Update the package repository
apt-get update -y

# Install Node.js and npm
apt-get install -y nodejs npm

# Install Docker
apt-get install -y docker.io

# Install Docker Compose
apt-get install -y docker-compose

# Clone the application repository (replace with your repository URL)
git clone https://github.com/yourusername/recruitment-webapp.git /home/ubuntu/recruitment-webapp

# Navigate to the application directory
cd /home/ubuntu/recruitment-webapp

# Install application dependencies
npm install

# Start the application using Docker Compose
docker-compose up -d

# Clean up
apt-get clean
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*