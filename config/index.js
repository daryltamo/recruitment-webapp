const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'myapp_db'
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
    // Add other configuration settings as needed
};

module.exports = config;
