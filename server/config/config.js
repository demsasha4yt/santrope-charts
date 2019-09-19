module.exports = {
  source: 'http://145.239.133.5/servers.json',
  interval: 1000 * 60 * 10,
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