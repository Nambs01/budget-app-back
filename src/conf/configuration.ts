const configuration = () => ({
    database: {
        type: process.env.DATABASE_TYPE || 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        name: process.env.DATABASE_NAME || 'budget_db',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
});

export default configuration;
