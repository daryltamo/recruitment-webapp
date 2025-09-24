// src/utils/dbHealthCheck.js
const { Pool } = require('pg');

async function testDatabaseConnection() {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionTimeoutMillis: 5000 // 5 seconds
    });

    try {
        console.log('🔍 Testing database connection...');
        const client = await pool.connect();

        // Test basic query
        const result = await client.query('SELECT NOW() as current_time, version() as db_version');
        console.log('✅ Database connection successful!');
        console.log(`📅 Database time: ${result.rows[0].current_time}`);
        console.log(`🗄️  Database version: ${result.rows[0].db_version.split(' ')[0]}`);

        // Test if our tables exist
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);

        console.log(`📊 Found ${tablesResult.rows.length} tables in database`);
        if (tablesResult.rows.length > 0) {
            console.log('📋 Tables:', tablesResult.rows.map(r => r.table_name).join(', '));
        }

        client.release();
        await pool.end();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        await pool.end();
        throw error;
    }
}

module.exports = { testDatabaseConnection };
