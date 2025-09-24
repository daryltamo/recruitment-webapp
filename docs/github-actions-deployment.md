# GitHub Actions CI/CD with Database Deployment

This document describes the enhanced CI/CD pipeline that includes PostgreSQL database deployment alongside the Node.js application.

## Overview

The workflow now includes:

- **Application build and security scanning**
- **Database deployment with PostgreSQL**
- **Coordinated application deployment**
- **Health checks for both database and application**

## Required GitHub Secrets

### Existing Secrets

- `AWS_ROLE_ARN` - AWS IAM role for OIDC authentication
- `AWS_REGION` - AWS region for deployment
- `EC2_INSTANCE_NAME` - EC2 instance tag name for deployment target

### New Secrets Required

- `ENV_FILE_B64` - Base64 encoded production environment file (see format below)
- `GHCR_READ_TOKEN` - GitHub Container Registry read token (optional for private images)

## Environment File Format

Your `ENV_FILE_B64` secret should contain a base64-encoded version of your production `.env` file. Use `.env.example` as a template:

```bash
# Example .env content for production (based on .env.example)
NODE_ENV=development
PORT=3000
SECRET_KEY=your_production_secret_key
JWT_SECRET=your_production_jwt_secret
SESSION_SECRET=your_production_session_secret

# Database (container deployment uses container names)
DB_HOST=recruitment_db
DB_PORT=5432
DB_NAME=recruitment_webapp
DB_USER=recruitment_user
DB_PASSWORD=your_secure_production_password

# File uploads
UPLOAD_DIR=/opt/recruitment-webapp/uploads
UPLOADS_PATH=/opt/recruitment-webapp/uploads
MAX_FILE_SIZE=5242880

# Email configuration
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email@your-domain.com
EMAIL_PASS=your_email_password
SMTP_HOST=your.smtp.server
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
FROM_EMAIL=noreply@your-domain.com
```

To create the base64 secret:

```bash
# Linux/macOS
base64 -w0 < development.env

# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes('development.env'))
```

## Workflow Stages

### 1. Build and Push

- Builds the Node.js application Docker image
- Runs security scans with Trivy
- Generates SBOM (Software Bill of Materials)
- Pushes to GitHub Container Registry

### 2. Deploy

- **Database Deployment**:

  - Installs Docker and Docker Compose on EC2
  - Deploys PostgreSQL using `docker-compose.db.yml`
  - Waits for database readiness
  - Verifies database connectivity

- **Application Deployment**:
  - Pulls the latest application image
  - Deploys connected to database network
  - Runs health checks

### 3. Verification

- Database connectivity tests via SSM
- Application health endpoint checks via SSM (suitable for private subnets)
- Container status verification via SSM

## Deployment Architecture

```
┌─────────────────────┐
│   GitHub Actions   │
└──────────┬──────────┘
           │ (via SSM)
           ▼
┌─────────────────────┐
│  Private Subnet EC2 │
│                     │
│  ┌───────────────┐  │
│  │  PostgreSQL   │  │
│  │  Container    │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │  Node.js App  │  │
│  │  Container    │  │
│  └───────────────┘  │
└─────────────────────┘
```

## Private Subnet Requirements

Since the EC2 instance is in a private subnet, the deployment uses **AWS Systems Manager (SSM)** for all remote commands and health checks:

### Required IAM Permissions

Your EC2 instance needs an IAM role with these policies:

- `AmazonSSMManagedInstanceCore` - For SSM agent communication
- `AmazonEC2ContainerRegistryReadOnly` - For pulling Docker images (if needed)

### VPC Endpoints (Recommended)

For better performance and security in private subnets, create VPC endpoints for:

- `com.amazonaws.region.ssm`
- `com.amazonaws.region.ssmmessages`
- `com.amazonaws.region.ec2messages`

### SSM Agent

Ensure SSM agent is installed and running:

```bash
# Amazon Linux 2
sudo systemctl status amazon-ssm-agent
sudo systemctl enable amazon-ssm-agent

# Check SSM connectivity
aws ssm describe-instance-information --region your-region
```

## Network Configuration

- **Network**: `recruitment_network` (Docker bridge network)
- **Database**: `recruitment_db` container on port 5432
- **Application**: `recruitment-webapp` container on port 3000
- **pgAdmin**: Optional `recruitment_pgadmin` on port 8080

## Manual Deployment Commands

If you need to deploy manually on the EC2 instance:

```bash
# Navigate to deployment directory
cd /opt/recruitment-webapp

# Deploy services with unified compose file
docker-compose up -d

# Check database health
docker exec recruitment_db pg_isready -U recruitment_user -d recruitment_webapp

# Deploy application (replace with your image)
docker run -d \
  --name recruitment-webapp \
  --env-file .env \
  --network recruitment_network \
  -p 3000:3000 \
  --restart=always \
  ghcr.io/daryltamo/recruitment-webapp:latest
```

## Monitoring and Logs

```bash
# Check container status
docker ps --filter 'name=recruitment'

# View application logs
docker logs recruitment-webapp --tail 50

# View database logs
docker logs recruitment_db --tail 50

# Database connectivity test
docker exec recruitment_db pg_isready -U recruitment_user -d recruitment_webapp

# Connect to database for debugging
docker exec -it recruitment_db psql -U recruitment_user -d recruitment_webapp
```

## Rollback Procedures

### Application Rollback

```bash
# Stop current application
docker rm -f recruitment-webapp

# Deploy previous version
docker run -d \
  --name recruitment-webapp \
  --env-file .env \
  --network recruitment_network \
  -p 3000:3000 \
  --restart=always \
  ghcr.io/daryltamo/recruitment-webapp:previous-tag
```

### Database Rollback

```bash
# Stop database
docker-compose -f docker-compose.db.yml down

# Restore from backup (if available)
docker exec -i recruitment_db psql -U recruitment_user -d recruitment_webapp < backup_file.sql

# Restart database
docker-compose -f docker-compose.db.yml up -d
```

## Troubleshooting

### Common Issues

1. **Database connection timeout**

   - Check if PostgreSQL container is running
   - Verify network connectivity between containers
   - Check environment variables

2. **Application fails to start**

   - Verify environment file is properly base64 encoded
   - Check application logs for specific errors
   - Ensure database is ready before application starts

3. **SSM command fails**
   - Verify EC2 instance has SSM agent installed and running
   - Check IAM permissions for EC2 instance (needs `AmazonSSMManagedInstanceCore` policy)
   - Verify instance is tagged correctly with the `Name` tag
   - Ensure instance is in a private subnet with proper routing to SSM endpoints

### Debug Commands

```bash
# List all networks
docker network ls

# Inspect network
docker network inspect recruitment_network

# Check container connectivity
docker exec recruitment-webapp ping recruitment_db

# View environment variables in container
docker exec recruitment-webapp env | grep DB_
```

## Security Notes

- Database passwords should be strong and unique for production
- Consider using AWS Secrets Manager for sensitive data
- Regularly update container images for security patches
- Monitor containers for vulnerabilities using the Trivy scan results
- Review and rotate access tokens periodically
