import { FastifyPluginCallback } from 'fastify';
import userController from '../controllers/user.controller';
import { checkAuthor, checkToken } from '../middleware/auth';

const authRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(require('fastify-auth')).after(() => {
    fastify
      .route({
        method: 'GET',
        url: '/me',
        preHandler: fastify.auth([checkToken]),
        handler: userController.getMe,
      })
      .route({
        method: 'GET',
        url: '/user/:id',
        preHandler: fastify.auth([checkAuthor]),
        handler: userController.getUser,
      })
      .route({
        method: 'GET',
        url: '/user/:id/drafts',
        preHandler: fastify.auth([checkAuthor]),
        handler: userController.getDrafts,
      })
      .route({
        method: 'PUT',
        url: '/addpayment',
        preHandler: fastify.auth([checkToken]),
        handler: userController.addPayment,
      });
  });
  done();
};

export default authRoute;
