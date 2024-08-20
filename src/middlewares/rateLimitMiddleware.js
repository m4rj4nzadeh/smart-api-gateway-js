import rateLimit from 'express-rate-limit';

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  headers: true, 
});

export default rateLimitMiddleware;
