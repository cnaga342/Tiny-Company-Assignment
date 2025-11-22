require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { connectDB } = require('./src/db');
const linksRouter = require('./src/routes/links');
const redirectRouter = require('./src/routes/redirect');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  // Healthcheck
  app.get('/healthz', (req, res) => {
    res.status(200).json({ ok: true, version: '1.0' });
  });

  // API routes
  app.use('/api/links', linksRouter);

  // Redirect route (must be after /api)
  app.use('/', redirectRouter);


         
const linkByCodeRouter = require('./src/routes/linkByCode'); // handles GET/DELETE /api/links/:code


app.use('/api/links', linkByCodeRouter);

  app.listen(PORT, () => {
    console.log(`TinyLink server running on port ${PORT}`);
  });
})();
