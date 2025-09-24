# Database Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Terminal access (Linux/macOS) or PowerShell (Windows)

## Quick Start

### 1. Set up environment variables

```bash
# Linux/macOS
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env

# Edit .env file with your preferred passwords
# Recommended: Use strong passwords in production
```

### 2. Deploy the services

```bash
# Start database only
docker-compose up -d db

# Start full application stack
docker-compose up -d

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f db
```

### 3. Verify deployment

- Database will be available at `localhost:5432`
- pgAdmin will be available at `http://localhost:8080`
- Default credentials are in your `.env` file

### 4. Connect to database

```powershell
# Using psql (if installed locally)
psql -h localhost -p 5432 -U recruitment_user -d recruitment_webapp

# Or use pgAdmin web interface at http://localhost:8080
```

## Database Schema Summary

### Fixed Issues from Original Script:

- ✅ **PostgreSQL Compatibility**: Removed MySQL-specific `AUTO_INCREMENT`, used `SERIAL`
- ✅ **Case Sensitivity**: Fixed table references (`User` → `'user'`)
- ✅ **Data Types**:
  - `org_siren`: `INTEGER` → `VARCHAR(9)` (SIREN codes can start with 0)
  - `user_phone`: `INTEGER` → `VARCHAR(20)` (better phone number handling)
- ✅ **Constraints**: Added proper foreign key constraints and indexes
- ✅ **Naming**: Standardized to `snake_case` throughout
- ✅ **Container Ready**: Added `DROP TABLE IF EXISTS` for clean redeployment

### Key Improvements:

- **Performance**: Added database indexes on frequently queried columns
- **Data Integrity**: Enhanced foreign key constraints and cascade options
- **Timestamps**: Used PostgreSQL `TIMESTAMP` with proper defaults
- **Security**: Quoted reserved word `'user'` as table name
- **Flexibility**: Added status tracking for applications and requests

## Production Deployment

### 1. Security Considerations

```yaml
# Use strong passwords
DB_PASSWORD=your_very_secure_password_here
PGADMIN_PASSWORD=another_secure_password
# Consider using Docker secrets for sensitive data
```

### 2. Backup Strategy

```bash
# Create backup (Linux/macOS)
docker exec recruitment_db pg_dump -U recruitment_user recruitment_webapp > backup_$(date +%Y-%m-%d).sql

# Create backup (Windows PowerShell)
docker exec recruitment_db pg_dump -U recruitment_user recruitment_webapp > backup_$(Get-Date -Format 'yyyy-MM-dd').sql

# Restore backup
docker exec -i recruitment_db psql -U recruitment_user -d recruitment_webapp < backup_file.sql
```

### 3. Monitoring

```bash
# Check database health
docker exec recruitment_db pg_isready -U recruitment_user -d recruitment_webapp

# View active connections
docker exec recruitment_db psql -U recruitment_user -d recruitment_webapp -c 'SELECT * FROM pg_stat_activity;'
```

## Connecting from Node.js Application

Update your `config/db.js` to use PostgreSQL:

```javascript
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "recruitment_webapp",
    user: process.env.DB_USER || "recruitment_user",
    password: process.env.DB_PASSWORD,
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect()
};
```

## Troubleshooting

### Common Issues:

1. **Port 5432 already in use**: Change port in docker-compose.yml
2. **Permission denied**: Ensure Docker has proper permissions
3. **Connection refused**: Check if container is running and healthy

### Useful Commands:

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This deletes all data)
docker-compose down -v

# Restart specific service
docker-compose restart db

# View container logs
docker-compose logs db
```
