import fastify, { FastifyInstance } from 'fastify';
import fastifyAuth from 'fastify-auth';

import { authRoute, userRoute, postRoute, tagRoute } from './routes';

const app: FastifyInstance = fastify({ logger: false });

app.register((fastify, options, done) => {
  fastify
    .register(require('fastify-cors'), {
      origin: '*',
      credentials: false,
      methods: ['POST', 'GET', 'PUT', 'DELETE'],
      /*   allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'content-type',
        'application/json',
        'x-access-token',
      ], */
    })
    .register(authRoute)
    .register(userRoute)
    .register(postRoute)
    .register(tagRoute)
    .register(require('fastify-swagger'), {
      routePrefix: '/documentation',
      swagger: {
        info: {
          title: 'Patrone',
          description: 'Patrone Fastify swagger API',
          version: '0.1.1',
        },
        host: 'localhost',
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'user', description: 'User related end-points' },
          { name: 'code', description: 'Code related end-points' },
        ],
        definitions: {
          User: {
            type: 'object',
            required: ['id', 'email'],
            properties: {
              id: { type: 'string', format: 'uuid' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
          },
        },
        securityDefinitions: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
      },
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      staticCSP: true,
      transformStaticCSP: (header: any) => header,
      exposeRoute: true,
    });
  done();
});
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () =>
  console.log(`
 Server is up at: http://localhost:4000 🚀
   `),
);
