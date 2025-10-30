import express from 'express';
import config from './config';
import cors, { type CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import limiter from './lib/express_rate_limit';

const app = express();

// configure cors options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      // reject requests from other origins
      callback(
        new Error(`CORS Error: ${origin} is not allowed by CORS`),
        false,
      );
      console.log(`CORS Error: ${origin} is not allowed by CORS`);
    }
  },
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// enable response compression to reduce the payload size and improve performance
app.use(
  compression({
    threshold: 1024, // only compress responses larger than 1kb
  }),
);
// helmet for enhance the security by setting various HTTP headers
app.use(helmet());
//apply rate limiting
app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.listen(config.PORT, () => {
  console.log(`Server is Listening on http://localhost:${config.PORT}`);
});
