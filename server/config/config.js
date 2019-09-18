module.exports = {
  port: 3000,
  db: {
    database: process.env.DB_NAME || 'uROkPuw2iQ',
    user: process.env.DB_USER || 'uROkPuw2iQ',
    password: process.env.DB_PASSWORD || 'SLPC4vUL1u',
    options: {
      dialect: 'mysql',
      host: process.env.HOST || 'remotemysql.com',
    }
  } 
}