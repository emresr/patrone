import { RouteHandler } from 'fastify';
import { prisma } from '../helpers/utils';

const addPost: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { title, content, authorEmail }: any = request.body;

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
      // tags: { connect: { name: tagData } },
      author: { connect: { email: authorEmail } },
    },
  });
  return reply.send(result);
};
const getFeed: RouteHandler<{ Params: any }> = async (request: any, reply) => {
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
const getPost: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { id }: any = request.params;
  const result = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  return reply.send(result);
};
const editPost: RouteHandler<{ Params: any }> = async (request: any, reply) => {
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
const publishPost: RouteHandler<{ Params: any }> = async (request: any, reply) => {
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
const likePost: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { id }: any = request.params;
  const { userId }: any = request.body;

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
const addView: RouteHandler<{ Params: any }> = async (request: any, reply) => {
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
const deletePost: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { id }: any = request.params;

  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return reply.send(post);
};

export default { addPost, getPost, publishPost, deletePost, likePost, editPost, addView, getFeed };
