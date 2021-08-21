import { FastifyPluginCallback } from 'fastify';
import postController from '../controllers/post.controller';
import { checkAuthor, checkPayment, checkToken } from '../middleware/auth';

const authRoute: FastifyPluginCallback = (fastify, options, done) => {
  fastify.route({
    method: 'PUT',
    url: '/post/:id/addview',
    handler: postController.addView,
  });

  fastify.register(require('fastify-auth')).after(() => {
    fastify
      .route({
        method: 'GET',
        url: '/feed',
        preHandler: fastify.auth([checkToken]),
        handler: postController.getFeed,
      })
      .route({
        method: 'GET',
        url: '/post/:id',
        preHandler: fastify.auth([checkPayment]),
        handler: postController.getPost,
      })
      .route({
        method: 'PUT',
        url: '/like/:id',
        preHandler: fastify.auth([checkToken]),
        handler: postController.likePost,
      })
      // Author Routes
      .route({
        method: 'POST',
        url: '/addpost',
        preHandler: fastify.auth([checkAuthor]),
        handler: postController.addPost,
      })
      .route({
        method: 'PUT',
        url: '/publish/:id',
        preHandler: fastify.auth([checkAuthor]),
        handler: postController.publishPost,
      })
      .route({
        method: 'PUT',
        url: '/edit/:id',
        preHandler: fastify.auth([checkAuthor]),
        handler: postController.editPost,
      })
      .route({
        method: 'DELETE',
        url: '/delete/:id',
        preHandler: fastify.auth([checkAuthor]),
        handler: postController.deletePost,
      });
  });

  done();
};

export default authRoute;
