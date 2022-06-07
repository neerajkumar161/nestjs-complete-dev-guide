var dbConfig = {
  synchronize: true, // Important: use with caution in production
  migrations: ['migrations/.*js'],
  cli: {
    migrationsDir: 'migrations' // Migrations not working
  }
}

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js']
    })
    break
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts']
    })
    break
  case 'prod':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false
      }
    })
    break
    break
  default:
    throw new Error('Unknown Node environment')
}

module.exports = dbConfig
