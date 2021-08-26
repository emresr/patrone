import { RouteHandler, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../helpers/utils';
import {
  IAddPostBody,
  IAddViewBody,
  IDeletePostBody,
  IEditPostBody,
  IGetFeedBody,
  IGetPostBody,
  ILikePostBody,
  IPublishPostBody,
  ISavePostBody,
} from '../types/postParams';

const addPost: RouteHandler<{ Body: IAddPostBody }> = async (request: any, reply: FastifyReply) => {
  const { title, content, abstract } = request.body;
  const userId: number = request.userId;
  /*   const tagData = tags
        ? tags.map((tag: any) => {
            return { name: tag || undefined };
          })
        : [];
      console.log(tagData); */
  const result = await prisma.post.create({
    data: {
      title,
      content,
      abstract,
      // tags: { connect: { name: tagData } },
      author: {
        connect: { id: userId },
      },
    },
  });
  return reply.send(result);
};
const getFeed: RouteHandler<{ Body: IGetFeedBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { searchString, skip, take, orderBy }: any = request.query;
  const or = searchString
    ? {
        OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined,
    },
  });

  return reply.send(posts);
};
const getPost: RouteHandler<{ Body: IGetPostBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params;
  const result = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      likedBy: true,
      tags: true,
    },
  });
  if (!result) {
    reply.status(404).send('No such a post');
  }
  return reply.send(result);
};
const editPost: RouteHandler<{ Body: IEditPostBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params;
  const { title, content }: any = request.body;
  const result = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });
  return reply.send(result);
};
const publishPost: RouteHandler<{ Body: IPublishPostBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: true },
    });
    return reply.status(200).send(updatedPost);
  } catch (error) {
    return reply.status(404).send({ error: `Post with ID ${id} does not exist in the database` });
  }
};
const likePost: RouteHandler<{ Body: ILikePostBody }> = async (request: any, reply: FastifyReply) => {
  const { id }: any = request.params;
  const userId: number = request.userId;

  const result = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      likedBy: {
        connect: {
          id: Number(userId),
        },
      },
      likeCount: {
        increment: 1,
      },
    },
    include: {
      likedBy: true,
    },
  });
  reply.send(result);
};

const deletePost: RouteHandler<{ Body: IDeletePostBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params;

  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return reply.send(post);
};
const addView: RouteHandler<{ Body: IAddViewBody }> = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return reply.send(post);
  } catch (error) {
    return reply.status(404).send({ error: `Post with ID ${id} does not exist in the database` });
  }
};
const savePost: RouteHandler<{ Body: ISavePostBody }> = async (request: any, reply: FastifyReply) => {
  const { id }: any = request.params;
  const userId: number = request.userId;

  const result = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      savedBy: { connect: { id: userId } },
    },
  });
  reply.send(result);
};
export default { addPost, getPost, publishPost, deletePost, likePost, editPost, addView, getFeed, savePost };
