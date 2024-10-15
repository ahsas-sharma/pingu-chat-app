import { body, validationResult, query } from 'express-validator';
import User from '../models/userModel.js';

export function signUpValidation() {
  return [
    body('username').notEmpty().escape(),
    body('email')
      .isEmail()
      .custom(async (value) => {
        // check if email already exists
        let emailFound = await User.findOne({ email: value });
        if (emailFound) {
          throw new Error('E-mail is already in use.');
        }
      }),
    body('password').isLength({
      min: 4,
      max: 16,
    }),
  ];
}

export function signInValidation() {
  return [body('email').notEmpty().isEmail(), body('password').notEmpty()];
}

// export function validateQueryParameters() {
//   return [
//     query('page')
//       .optional()
//       .isInt({ min: 1 })
//       .withMessage('Page must be a positive integer.'),
//     query('limit')
//       .optional()
//       .isInt({ min: 1, max: 100 })
//       .withMessage('Limit must be between 1 and 100'),
//     query('filter').optional(),
//     query('sort').optional().isIn(['asc', 'desc']),
//   ];
// }

export function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(400).send({ error: result.array() });
}
