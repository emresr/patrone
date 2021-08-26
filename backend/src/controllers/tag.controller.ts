import { RouteHandler, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../helpers/utils';
import { IFollowTagBody, IGetTagFeedBody } from '../types/tagParams';

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
const followTag: RouteHandler<{ Body: IFollowTagBody }> = async (request: any, reply: FastifyReply) => {
  const { name }: any = request.params;
  const userId: number = request.userId;

  const result = await prisma.tag.update({
    where: {
      name: name,
    },
    data: {
      followedBy: {
        connect: {
          id: Number(userId),
        },
      },
    },
  });
  if (!result) {
    reply.status(404).send('No such a tag');
  }
  return reply.send(result);
};
export default {
  getTagFeed,
  followTag,
};
