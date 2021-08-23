import { FastifyPluginCallback } from 'fastify';
import tagController from '../controllers/tag.controller';
import { checkToken } from '../middleware/auth';

const tagRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(require('fastify-auth')).after(() => {
    fastify.route({
      method: 'GET',
      url: '/tag/:name',
      preHandler: fastify.auth([checkToken]),
      handler: tagController.getTagFeed,
    });
  });
  done();
};

export default tagRoute;
