import { RouteHandler } from 'fastify';
import { prisma } from '../helpers/utils';

const addPost: RouteHandler<{ Params: any }> = async (request: any, res) => {
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
  return res.send(result);
};
const getFeed: RouteHandler<{ Params: any }> = async (request: any, res) => {
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

  return res.send(posts);
};
const getPost: RouteHandler<{ Params: any }> = async (request: any, res) => {
  const { id }: any = request.params;
  const result = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.send(result);
};
const editPost: RouteHandler<{ Params: any }> = async (request: any, res) => {
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
  return res.send(result);
};
const publishPost: RouteHandler<{ Params: any }> = async (request: any, res) => {
  const { id }: any = request.params;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: true },
    });
    return res.status(200).send(updatedPost);
  } catch (error) {
    return res.status(404).send({ error: `Post with ID ${id} does not exist in the database` });
  }
};
const likePost: RouteHandler<{ Params: any }> = async (request: any, res) => {
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
  res.send(result);
};
const addView: RouteHandler<{ Params: any }> = async (request: any, res) => {
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

    return res.send(post);
  } catch (error) {
    return res.status(404).send({ error: `Post with ID ${id} does not exist in the database` });
  }
};
const deletePost: RouteHandler<{ Params: any }> = async (request: any, res) => {
  const { id }: any = request.params;

  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return res.send(post);
};

export default { addPost, getPost, publishPost, deletePost, likePost, editPost, addView, getFeed };
