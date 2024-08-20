export default {
    security: {
      enabled: process.env.ENABLE_SECURITY_MIDDLEWARE === 'true',
      encryptionKey: process.env.ENCRYPTION_KEY
    },
    rateLimit: {
      enabled: process.env.ENABLE_RATE_LIMIT_MIDDLEWARE === 'true',
      maxRequests: 100,
      windowMs: 15 * 60 * 1000
    },
    cors: {
      enabled: process.env.ENABLE_CORS_MIDDLEWARE === 'true',
      origin: '*'
    },
    logging: {
      enabled: process.env.ENABLE_LOGGING_MIDDLEWARE === 'true',
      level: 'info'
    }
  };
  