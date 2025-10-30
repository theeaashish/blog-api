import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  limit: 60, // limit each IP to 60 requests per minute
  standardHeaders: 'draft-8', // use the latest version of the standard
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
  message: {
    error: 'You have exceeded the rate limit. Please try again later.',
  },
});

export default limiter;
