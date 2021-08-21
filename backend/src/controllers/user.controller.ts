import { RouteHandler } from 'fastify';
import { prisma } from '../helpers/utils';

const getUser: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { id }: any = request.params;

  const result = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      posts: true,
      liked: true,
      followedTags: true,
    },
  });

  return reply.status(200).send(result);
};
const getDrafts: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { id }: any = request.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    });

  return reply.send(drafts);
};

const addPayment: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const userId: number = request.userId;

  const user: any = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const newUntil = user.until ? Date.parse(user.until) : Date.now();

  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      until: new Date(newUntil + 86400000 * 30),
    },
  });

  return reply.send(result);
};

export default { getUser, getDrafts, addPayment };
