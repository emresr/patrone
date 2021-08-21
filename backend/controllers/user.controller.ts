import { RouteHandler } from 'fastify';
import { prisma } from '../helpers/utils';

const getUser: RouteHandler<{ Params: any }> = async (request: any, res) => {
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

  return res.status(200).send(result);
};
const getDrafts: RouteHandler<{ Params: any }> = async (request: any, res) => {
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

  return res.send(drafts);
};
export default { getUser, getDrafts };
