import { RouteHandler, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../helpers/utils';
import { IGetTagFeedBody } from '../types/tagParams';

const getTagFeed: RouteHandler<{ Body: IGetTagFeedBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name }: any = request.params;
  const posts = await prisma.tag.findUnique({
    where: { name: name },
    select: {
      posts: {
        include: { author: true },
      },
    },
  });
  if (!posts) {
    reply.status(404).send('No such a tag');
  }
  return reply.send(posts);
};

export default {
  getTagFeed,
};
