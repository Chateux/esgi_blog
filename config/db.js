const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'esgi_blog',
    password: 'test'
});

pool.connect(error => {
	if(error) {
		console.error('Database : Error - ', error.stack);
	}
	console.log('Database : OK');
});

module.exports = { pool };

