import express from 'express';
import config from './config';
import cors, { type CorsOptions } from 'cors';

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

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.listen(config.PORT, () => {
  console.log(`Server is Listening on http://localhost:${config.PORT}`);
});
