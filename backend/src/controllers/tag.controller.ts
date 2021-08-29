import { RouteHandler, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../helpers/utils';
import { IFollowTagBody, IGetMyTagInfoBody, IGetTagFeedBody } from '../types/tagParams';

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

  const isFollowed: any = await prisma.tag.findUnique({
    where: { name },
    select: { followedBy: true },
  });
  const followList = isFollowed.followedBy;
  let follow = false;
  if (followList.length > 0) {
    for (let i = 0; i < followList.length; i++) {
      if (followList[i].id === userId) {
        follow = true;
      }
    }
  }
  console.log(follow);

  const pushUpdate = follow
    ? {
        disconnect: {
          id: Number(userId),
        },
      }
    : {
        connect: {
          id: Number(userId),
        },
      };

  const result = await prisma.tag.update({
    where: {
      name: name,
    },
    data: {
      followedBy: pushUpdate,
    },
  });
  if (!result) {
    reply.status(404).send('No such a tag');
  }
  return reply.send(result);
};
const getMyTagInfo: RouteHandler<{ Body: IGetMyTagInfoBody }> = async (request: any, reply: FastifyReply) => {
  const { name }: any = request.params;
  const userId: number = request.userId;

  const isFollowed: any = await prisma.tag.findUnique({
    where: { name },
    select: { followedBy: true },
  });
  const followList = isFollowed.followedBy;

  let followStatus = false;
  for (let i = 0; i < followList.length; i++) {
    if (followList[i].id === userId) {
      followStatus = true;
    }
  }
  return reply.send(followStatus);
};

export default {
  getTagFeed,
  followTag,
  getMyTagInfo,
};
