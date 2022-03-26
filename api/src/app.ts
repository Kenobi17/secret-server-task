import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import secretRouter from './routes/secret.routes';
import './db';

const app = express();

app.use(cors({ origin: process.env.ORIGIN_URL || 'http://localhost:3000' }));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/secret', secretRouter);

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
