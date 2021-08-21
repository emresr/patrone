const { PrismaClient } = require('@prisma/client');
import { AsyncLocalStorage } from 'async_hooks';
import fastify, { FastifyInstance, RouteShorthandOptions, RequestGenericInterface } from 'fastify';
import fastifyAuth from 'fastify-auth';

import authRoute from '../routes/auth.route';
import userRoute from '../routes/user.route';
import postRoute from '../routes/post.route';

const prisma = new PrismaClient();
export { prisma };
const app: FastifyInstance = fastify({ logger: false });

app.register((fastify, options, done) => {
  fastify
    .register(require('fastify-cors'), {
      origin: '*',
      credentials: true,
      methods: ['POST', 'GET', 'PUT', 'DELETE'],
      allowedHeaders: ['Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'],
    })
    .register(authRoute)
    .register(userRoute)
    .register(postRoute);

  done();
});
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () =>
  console.log(`
 Server is up at: http://localhost:4000 🚀
   `),
);
