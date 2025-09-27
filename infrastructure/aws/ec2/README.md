# EC2 Deployment Instructions for Recruitment Web App

This document provides instructions for deploying the Recruitment Web App on an Amazon EC2 instance.

## Prerequisites

1. **AWS Account**: Ensure you have an active AWS account.
2. **EC2 Instance**: Launch an EC2 instance with the following specifications:
   - Amazon Machine Image (AMI): Ubuntu Server 20.04 LTS (or your preferred version)
   - Instance Type: t2.micro (or as required)
   - Security Group: Allow inbound traffic on ports 22 (SSH) and 3000 (for the application).

## Setup Instructions

1. **Connect to Your EC2 Instance**:
   Use SSH to connect to your EC2 instance:
   ```
   ssh -i your-key.pem ec2-user@your-ec2-public-dns
   ```

2. **Install Node.js and npm**:
   Update the package index and install Node.js and npm:
   ```
   sudo yum update
   sudo yum install -y nodejs npm
   ```

3. **Install Docker**:
   Follow these commands to install Docker:
   ```
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

4. **Clone the Repository**:
   Clone your application repository to the EC2 instance:
   ```
   git clone https://github.com/yourusername/recruitment-webapp.git
   cd recruitment-webapp
   ```

5. **Build the Docker Image**:
   First make sure to add your user to the docker group:
   ```
   sudo usermod -aG docker ec2-user
   ```

   And re‑load group membership (either re-login or):
   ```
   newgrp docker
   ```

   Build the Docker image using the provided Dockerfile:
   ```
   sudo docker build -t recruitment-webapp .
   ```

6. **Run the Docker Container**:
   Run the Docker container, mapping the necessary ports:
   ```
   sudo docker run -d -p 3000:3000 recruitment-webapp
   ```

7. **Access the Application**:
   Open a web browser and navigate to `http://your-ec2-public-dns:3000` to access the application.

## Additional Configuration

- **Environment Variables**: Ensure to set up any required environment variables as specified in your `.env.example` file.
- **Database Setup**: If your application requires a database, ensure to set it up and configure the connection in your application.

## Troubleshooting

- If you encounter issues, check the logs of your Docker container:
  ```
  sudo docker logs <container_id>
  ```

- Ensure that your security group settings allow traffic on the necessary ports.

## Conclusion

You have successfully deployed the Recruitment Web App on an Amazon EC2 instance. For further customization and scaling, consider using AWS services such as RDS for databases and Elastic Load Balancing for traffic management.