import { FastifyPluginCallback } from 'fastify';
import authController from '../controllers/auth.controller';
import { checkAuthor } from '../middleware/auth';

const authRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(require('fastify-auth')).after(() => {
    fastify
      .route({
        method: 'POST',
        url: '/auth/signup',
        preHandler: fastify.auth([checkAuthor]),
        handler: authController.signup,
      })
      .route({
        method: 'POST',
        url: '/auth/login',
        handler: authController.login,
      });
  });
  done();
};

export default authRoute;
