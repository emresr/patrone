import { FastifyPluginCallback } from 'fastify';
import tagController from '../controllers/tag.controller';
import { checkToken } from '../middleware/auth';
import { checkPayment } from '../middleware/user';

const tagRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(require('fastify-auth')).after(() => {
    fastify
      .route({
        method: 'GET',
        url: '/tag/:name',
        preHandler: fastify.auth([checkToken]),
        handler: tagController.getTagFeed,
      })
      .route({
        method: 'PUT',
        url: '/follow/:name',
        preHandler: fastify.auth([checkPayment]),
        handler: tagController.followTag,
      });
  });
  done();
};

export default tagRoute;
