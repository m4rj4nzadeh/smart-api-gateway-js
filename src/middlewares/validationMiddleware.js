import { body, validationResult } from 'express-validator';

const validationMiddleware = [
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validationMiddleware;
