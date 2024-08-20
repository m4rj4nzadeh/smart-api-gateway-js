import securityMiddleware from '../middlewares/securityMiddleware.js';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware.js';
import corsMiddleware from '../middlewares/corsMiddleware.js';
import loggingMiddleware from '../middlewares/loggingMiddleware.js';
import aiRoutingMiddleware from '../middlewares/aiRoutingMiddleware.js';

import routes from '../routes/index.js';

export function loadMiddlewares(app) {
  if (process.env.ENABLE_SECURITY_MIDDLEWARE === 'true') {
    app.use(securityMiddleware);
  }

  if (process.env.ENABLE_RATE_LIMIT_MIDDLEWARE === 'true') {
    app.use(rateLimitMiddleware);
  }

  if (process.env.ENABLE_CORS_MIDDLEWARE === 'true') {
    app.use(corsMiddleware);
  }

  if (process.env.ENABLE_LOGGING_MIDDLEWARE === 'true') {
    app.use(loggingMiddleware);
  }

  if (process.env.ENABLE_AI_MIDDLEWARE === 'true') {
    app.use(aiRoutingMiddleware);
  }
  
}

export function loadRoutes(app) {
  app.use('/', routes);
}
