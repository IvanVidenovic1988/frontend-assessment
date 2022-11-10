import express from 'express';
import { createHandler } from './utils/createHandler';
import { login } from './handlers/login';
import { me } from './handlers/me';
import { events } from './handlers/events';
import { event } from './handlers/event';
import cors from 'cors';
import { config } from './config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: config.publicUrl,
    methods: ['Options', 'Post'],
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/login', createHandler(login));
app.get('/me', createHandler(me, true));
app.get('/events', createHandler(events, true));
app.get('/events/:id', createHandler(event, true));
app.get('*', (_, res) => {
  res.status(404);
  res.json({ message: 'Route not found' });
});
app.listen(config.port);

console.log(`Server is listening on ${config.port}`);
