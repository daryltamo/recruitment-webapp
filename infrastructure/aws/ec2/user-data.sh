#!/bin/bash

# Update the package repository
sudo yum update -y

# Install Node.js and npm
sudo yum install -y nodejs npm

# Install Docker
sudo yum install -y docker

# Install Docker Compose
sudo yum install -y docker-compose

# Clone the application repository (replace with your repository URL)
git clone https://github.com/yourusername/recruitment-webapp.git /home/ubuntu/recruitment-webapp

# Navigate to the application directory
cd /home/ubuntu/recruitment-webapp

# Install application dependencies
npm install

# Start the application using Docker Compose
docker-compose up -d

# Clean up
sudo yum clean all
