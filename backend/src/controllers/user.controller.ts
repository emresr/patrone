import { RouteHandler, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../helpers/utils';
import { User } from '../types/models';
import { IAddPaymentBody, IGetDraftsBody, IGetMeBody, IGetUserBody, IGetMyTagsBody } from '../types/userParams';

const getMe: RouteHandler<{ Body: IGetMeBody }> = async (request: any, reply: FastifyReply) => {
  const userId: number = request.userId;

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      liked: true,
      saved: true,
      followedTags: true,
    },
  });

  return reply.send(result);
};
const getUser: RouteHandler<{ Body: IGetUserBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
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

  return reply.send(result);
};
const getMyTags: RouteHandler<{ Body: IGetMyTagsBody }> = async (request: any, reply: FastifyReply) => {
  const userId: number = request.userId;

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      followedTags: true,
    },
  });

  return reply.send(result);
};

const getDrafts: RouteHandler<{ Body: IGetDraftsBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
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

const addPayment: RouteHandler<{ Body: IAddPaymentBody }> = async (request: any, reply: FastifyReply) => {
  const userId: number = request.userId;
  console.log(userId);
  const user: any = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const newUntil: number = user.until ? Date.parse(user.until) : Date.now();

  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      until: new Date(newUntil + 86400000 * 30),
    },
  });

  return reply.send(result);
};

export default { getUser, getDrafts, getMe, addPayment, getMyTags };
