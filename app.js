import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import router from './routes/posts.js';

const app = express();

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/api', router);

export default app;